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

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async (page = 1) => {
    try {
      const res = await fetch(`/api/v1/card?page=${page}`);
      const dt = await res.json();
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

  if (cards?.length == 0) {
    <div className="col-span-5 flex items-center">
      <Loader className="animate-spin" strokeWidth={2.5} />
    </div>;
  }
  return (
    <>
      <InfiniteScroll
        loader={
          <div className="col-span-5 flex items-center">
            <Loader className="animate-spin" strokeWidth={2.5} />
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
          <div className="card">
            <div
              style={{ transformStyle: "preserve-3d" }}
              className="w-60 h-96 mx-auto card__content shadow-lg relative transition-transform duration-1000 rounded-sm"
            >
              <Card
                key={card._id}
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
                qrValue={`${globalThis.location.href}/redirect/${card.urlCode}`}
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
                  <div className="flex flex-col w-[80%] mx-auto bg-white border-2 border-black rounded-lg shadow mt-20 py-4 gap-1 justify-center items-center">
                    <h5 className="text-xl font-semibold">Total scans:</h5>
                    <h4 className="text-3xl font-bold">00</h4>
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
                  qrValue={`${globalThis.location.href}/redirect/${card.urlCode}`}
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
