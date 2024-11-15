"use client";

import { Card as Crd } from "@/type/card";
import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import { getColors, getGradient } from "@/utils/utility";
import { Download, Loader, Pencil } from "lucide-react";
import Link from "next/link";
import html2canvas from "html2canvas";
import downloadjs from "downloadjs";

export default function DashboardCardList() {
  const [cards, setCards] = useState<Crd[]>([]);
  const [maxPages, setMaxPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async (page = 1) => {
    try {
      const res = await fetch(`/api/v1/card?page=${page}`);
      const dt = await res.json();
      setIsLoading(false);
      if (dt.message) {
        setMaxPages(dt.totalPage);
        setCurrentPage(page);
        setCards((cards) =>
          page == 1 ? dt.cards : [...(cards ?? []), ...dt.cards]
        );
        return dt;
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleCaptureClick = useCallback(async (id: string) => {
    const card = globalThis.document.getElementById(id);
    if (!card) return;
    const canvas = await html2canvas(card);
    const dataURL = canvas.toDataURL("image/png");
    downloadjs(dataURL, "download.png", "image/png");
  }, []);

  if (isLoading) {
    return (
      <div className="col-span-5">
        <Loader className="animate-spin mx-auto" strokeWidth={2.5} />
      </div>
    );
  }
  return (
    <>
      <InfiniteScroll
        loader={
          <div className="col-span-5 flex items-center">
            <Loader className="animate-spin" strokeWidth={2.5} />
          </div>
        }
        endMessage={
          <div className="col-span-5 flex items-center">
            <div className="max-w-xl mx-auto text-center font-semibold">
              You have reached the bottom of the abyss, perhaps you may yet
              shake the stars and the abyss...
              <svg
                className="mx-auto mt-2"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="m12 2c-5.514 0-10 4.486-10 10s4.486 10 10 10 10-4.486 10-10-4.486-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                <path d="m14.828 14.828c-.184.184-.383.348-.591.489-.215.145-.444.269-.679.368-.245.103-.497.182-.75.233-.531.107-1.087.107-1.616 0-.254-.052-.506-.131-.749-.232-.236-.101-.466-.225-.679-.368-.21-.143-.409-.307-.594-.492-.182-.18-.346-.379-.488-.59l-1.658 1.117c.215.319.462.619.733.889.272.273.571.52.888.733.32.217.663.402 1.021.554.366.153.744.271 1.127.349.396.081.803.122 1.207.122s.811-.041 1.208-.122c.382-.077.76-.195 1.128-.35.355-.15.698-.336 1.021-.554.314-.213.613-.459.885-.73s.52-.571.734-.891l-1.658-1.117c-.143.211-.307.41-.49.592z" />
                <circle cx="8.5" cy="10.5" r="1.5" />
                <path d="m15.5 10c-2 0-2.5 2-2.5 2h5s-.501-2-2.5-2z" />
              </svg>
            </div>
          </div>
        }
        dataLength={cards?.length || 0}
        hasMore={currentPage < maxPages}
        next={() => {
          getCards(currentPage + 1);
        }}
        className="grid grid-cols-4 gap-x-6 gap-y-12 my-5"
      >
        {cards?.map((card) => (
          <div key={card._id} className="card">
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="w-60 h-96 mx-auto card__content shadow-lg relative transition-transform duration-1000 rounded-sm"
            >
              <Card
                ref={null}
                style={{ backfaceVisibility: "hidden" }}
                className="card__front inset-0 mx-auto pt-4 px-4 absolute border-4 border-black"
                gradient={getGradient(
                  card.gradientType,
                  card.angle,
                  card.position[0] ?? 0,
                  card.position[1] ?? 0,
                  getColors(
                    card.backgroundColors[0],
                    card.backgroundColors[1],
                    card.points
                  )
                )}
                qrValue={`${process.env.NEXT_PUBLIC_APP_URL}/redirect/${card.urlCode}`}
                qrBgColor={card.QRColors[0]}
                qrFgColor={card.QRColors[1]}
              />
              <div
                style={{ backfaceVisibility: "hidden" }}
                className="card__back absolute inset-0 p-8 bg-white flex items-center justify-center border-4 border-black"
              >
                <div className="absolute inset-0 bg-white/60 z-50 p-3">
                  <div className="flex justify-between">
                    <div className="w-fit h-fit bg-black rounded">
                      <button
                        onClick={() => handleCaptureClick(card._id)}
                        title="Download"
                        className="flex items-center gap-2 p-2 bg-white transition-all translate-x-0.5 -translate-y-0.5 hover:-translate-y-1 hover:translate-x-1 active:!translate-x-0 active:!translate-y-0 font-bold border-2 border-black rounded"
                      >
                        <Download
                          strokeWidth={2.5}
                          size={20}
                          className="mt-0.5"
                        />
                      </button>
                    </div>
                    <div className="w-fit h-fit bg-black rounded">
                      <Link
                        href={`/dashboard/card/${card.urlCode}`}
                        title="Edit card"
                        className="flex items-center gap-2 p-2 bg-white transition-all translate-x-0.5 -translate-y-0.5 hover:-translate-y-1 hover:translate-x-1 active:!translate-x-0 active:!translate-y-0 font-bold border-2 border-black rounded"
                      >
                        <Pencil
                          strokeWidth={2.5}
                          size={20}
                          className="mt-0.5"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="bg-black w-[80%] rounded mx-auto shadow mt-20">
                    <div className="flex flex-col rounded-lg bg-white border-2 border-black translate-x-1 -translate-y-1 py-4 gap-1 justify-center items-center">
                      <h5 className="text-xl font-semibold">Total scans:</h5>
                      <h4 className="text-3xl font-bold">{card.totalScans }</h4>
                    </div>
                  </div>
                </div>
                <Card
                  id={card._id}
                  key={card._id}
                  ref={null}
                  style={{ backfaceVisibility: "hidden" }}
                  className="inset-0 pt-4 px-4 absolute"
                  gradient={getGradient(
                    card.gradientType,
                    card.angle,
                    card.position[0] ?? 0,
                    card.position[1] ?? 0,
                    getColors(
                      card.backgroundColors[0],
                      card.backgroundColors[1],
                      card.points
                    )
                  )}
                  qrValue={`${process.env.NEXT_PUBLIC_APP_URL}/redirect/${card.urlCode}`}
                  qrBgColor={card.QRColors[0]}
                  qrFgColor={card.QRColors[1]}
                />
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
}
