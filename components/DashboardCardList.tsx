"use client";

import { Card as Crd } from "@/type/card";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import { getColors, getGradient } from "@/utils/utility";
import { Loader } from "lucide-react";

interface CardRes {
  message: string;
  cards: Crd[];
  totalPage: number;
  status: number;
}

interface DashboardCardListProps {
  initialCard: CardRes;
}

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
        setCards((cards) => [...(cards ?? []), ...dt.cards]);
        return dt;
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  if (cards?.length == 0) {
    <div className="col-span-5 flex items-center">
      <Loader className="animate-spin" strokeWidth={2.5} />
    </div>;
  }
  return (
    <InfiniteScroll
      loader={
        <div className="col-span-5 flex items-center">
          <Loader className="animate-spin" strokeWidth={2.5} />
        </div>
      }
      dataLength={cards?.length || 0}
      hasMore={currentPage < maxPages}
      next={() => getCards(currentPage + 1)}
      className="grid grid-cols-5 gap-6 my-5"
    >
      {cards?.map((card, index) => (
        <Card
          ref={null}
          className="w-40 h-60 border-black shadow mx-auto pt-4 px-4 rounded-sm border-2"
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
          qrValue={card.urlCode}
          qrBgColor={card.QRColors[0]}
          qrFgColor={card.QRColors[1]}
        />
      ))}
    </InfiniteScroll>
  );
}
