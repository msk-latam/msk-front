import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://cms1.msklatam.com/wp-json/msk/v1/front/inicio?lang=int&nocache=1');
    
    if (!res.ok) {
      throw new Error("Error al obtener los datos de MasterClass");
    }

    const json = await res.json();
    const masterclasses = json?.sections?.masterclass?.masterclases || [];

    const fixedMasterclasses = masterclasses.map((item: any) => {
      const fixedImage = typeof item.background_image?.[0] === 'string'
        ? item.background_image[0].replace('https://es.wp.msklatam.com', 'https://cms1.msklatam.com')
        : item.background_image?.[0];

        const fixedDoctors = Array.isArray(item.doctors)
  ? item.doctors.map((doc: any) => ({
      name: doc?.name || "Nombre no disponible",
      specialty: doc?.specialty || "",
      image: typeof doc?.image === "string"
        ? doc.image.replace('https://es.wp.msklatam.com', 'https://cms1.msklatam.com')
        : null,
      link: doc?.link || "#", // 👈 este campo es clave para que funcione el botón Ver perfil
    }))
  : [];
      

      return {
        ...item,
        background_image: [fixedImage, ...(item.background_image?.slice(1) || [])],
        doctors: fixedDoctors,
      };
    });

    return NextResponse.json({ masterclasses: fixedMasterclasses });
  } catch (error: any) {
    console.error("Error al obtener masterclass:", error.message);
    return NextResponse.json({ error: 'Error al obtener los datos de MasterClass' }, { status: 500 });
  }
}
