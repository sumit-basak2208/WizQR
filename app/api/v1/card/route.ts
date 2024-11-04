import Cards from "@/models/card.model";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    let page: number = Number(searchParams.get("page"));
      if (!page) page = 1;
    
    return NextResponse.json(
      {
        error: "Something went wrong, please try again later!",
      },
      {
        status: 200,
      }
    );
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
