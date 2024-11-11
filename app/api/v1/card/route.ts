import connnect from "@/db/db";
import Cards from "@/models/card.model";
import { getTokenData } from "@/utils/token";
import { getUserId } from "@/utils/utility";
import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import randomstring from "randomstring";

connnect();

export async function GET(req: NextRequest) {
  try {
    // Check if user is authorized
    const tokenCookie = cookies().get("token");
    const userId = getUserId(tokenCookie);
    if (!userId)
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        {
          status: 401,
        }
      );
    // Get pagenumber
    const searchParams = req.nextUrl.searchParams;
    let page: number = Number(searchParams.get("page"));
    if (!page) page = 1;

    // fetch cards
    const totalCards = await Cards.countDocuments({ owner: userId });
    const cards = await Cards.find({ owner: userId })
      .sort({ updatedAt: -1 })
      .skip((page - 1) * 10)
      .limit(10);

    return NextResponse.json({
      message: "Cards fetched ssuccessfully",
      cards,
      totalPage: Math.ceil(totalCards / 10),
      status: 200,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err);
    return NextResponse.json(
      {
        error: err?.message || "Something went wrong, please try again later!",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check if user is authorized
    const tokenCookie = cookies().get("token");
    const userId = getUserId(tokenCookie);
    if (!userId)
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        {
          status: 401,
        }
      );
    const {
      url,
      gradientType,
      position,
      backgroundColors,
      QRColors,
      angle,
      points,
    } = await req.json();

    const newCard = new Cards({
      url,
      gradientType,
      position,
      backgroundColors,
      QRColors,
      points,
      angle,
      urlCode: randomstring.generate(10),
      owner: userId,
    });

    const savedCard = await newCard.save();

    return NextResponse.json({
      message: "Card created ssuccessfully",
      card: savedCard,
      status: 200,
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err);
    return NextResponse.json(
      {
        error: err?.message || "Something went wrong, please try again later!",
      },
      {
        status: 500,
      }
    );
  }
}
