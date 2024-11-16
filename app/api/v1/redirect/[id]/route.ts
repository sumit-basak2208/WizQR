import connnect from "@/db/db";
import Cards from "@/models/card.model";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-static'

connnect();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await params;
    const card = await Cards.findOneAndUpdate(
      { urlCode: data.id },
      { $inc: { totalScans: 1 } }
    );
    if (!card) {
      return NextResponse.json(
        {
          error: "Card not found!",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json({
      redirectUrl: card.url,
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
