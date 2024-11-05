import Cards from "@/models/card.model";
import { getTokenData } from "@/utils/token";
import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Check if user is authorized
    const tokenCookie = cookies().get("token");
    if (!tokenCookie)
      return NextResponse.json(
        {
          error: "Unauthorized!",
        },
        {
          status: 401,
        }
      );
    const dt = getTokenData(tokenCookie.value);
    const data = dt as { userId: string } | boolean;
    if (!data || typeof data != "object")
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
    const cards = await Cards.find({ owner: data.userId })
      .skip(page - 1 * 10)
      .limit(10);

    return NextResponse.json({
      message: "Cards fetched ssuccessfully",
      cards,
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
