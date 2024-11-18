import connnect from "@/db/db";
import Cards from "@/models/card.model";
import { getUserId } from "@/utils/utility";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

connnect();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const data = await params;
    const tokenCookie = (await cookies()).get("token");
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
    const card = await Cards.findOne({ urlCode: data.id, owner: userId });
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
      message: "Card fetched successfully",
      card,
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {
      url,
      gradientType,
      position,
      backgroundColors,
      QRColors,
      angle,
      points,
    } = await req.json();

    const data = await params;
    const tokenCookie = (await cookies()).get("token");
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
    const card = await Cards.findOne({ urlCode: data.id, owner: userId });

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

    card.url = url;
    card.gradientType = gradientType;
    card.position = position;
    card.backgroundColors = backgroundColors;
    card.QRColors = QRColors;
    card.angle = angle;
    card.points = points;

    await card.save();

    revalidatePath(`/api/v1/redirect/${card.urlCode}`);

    return NextResponse.json({
      message: "Card updated ssuccessfully",
      card: card,
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
