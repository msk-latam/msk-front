import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=es"); // Replace with the actual FAQ endpoint
    const json = await res.json();

    const faqData = json?.sections?.faq || [];

    // Map the FAQ data to the desired structure
    const faqs = faqData.map((faq: any) => ({
      id: faq.id,
      question: faq.title?.rendered || "",
      answer: faq.content?.rendered || "",
    }));

    return NextResponse.json({ faqs });
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener las preguntas frecuentes" }, { status: 500 });
  }
}
