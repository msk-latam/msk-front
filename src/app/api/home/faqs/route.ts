import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1", {
      next: { revalidate: 30 },
    });
    const json = await res.json();

    const questions = json?.sections?.faqs?.questions || [];

    const faqs = questions.map((item: any, index: number) => ({
      id: index + 1,
      question: item.question || "Sin pregunta",
      answer: item.answer || "Sin respuesta",
    }));

    return NextResponse.json({ faqs });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las preguntas frecuentes" },
      { status: 500 }
    );
  }
}
