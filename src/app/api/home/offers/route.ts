import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1", {
      next: { revalidate: 0 },
    });
    const json = await res.json();
    return NextResponse.json(json.sections.offers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
