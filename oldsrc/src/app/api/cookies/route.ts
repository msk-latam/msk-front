import { serialize, parse } from "cookie";
import { NextResponse } from "next/server";
export const runtime = "edge"; //Test

export const GET = async (request: Request) => {
  try {
    return NextResponse.json(
      {
        test: "",
      },
      { status: 201 }
    );
    // Obtener todas las cookies de la solicitud
    // const cookieHeader = request.headers.get("Cookie");

    // // Parsear las cookies en un objeto
    // const cookies = parse(cookieHeader || "");

    // // Construir un objeto con los nombres y valores de las cookies
    // const cookiesObject = {};
    // for (const [name, value] of Object.entries(cookies)) {
    //   cookiesObject[name] = value;
    // }

    // // Devolver el objeto con los nombres y valores de las cookies como JSON
    // return new Response(JSON.stringify(cookiesObject), {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  } catch (error) {
    console.error("Error en el endpoint GET:", error);
    // Manejar errores aquí
    return new Response("Error interno del servidor", { status: 500 });
  }
};

export const POST = async (request: Request) => {
  try {
    const cookies = parse(request.headers.get("cookie") || "");
    const cookie = cookies.country || "No hay cookie establecida";
    const requestBody = await request.json();
    const cookieName = requestBody.cookieName;
    const cookieValue = requestBody.cookieValue;
    if (cookieName && cookieValue) {
      let response = new Response(JSON.stringify({ country: cookie }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.headers.append(
        "Set-Cookie",
        `${cookieName}=${cookieValue}; Path=/; Expires=${new Date(
          Date.now() + 365 * 24 * 60 * 60 * 1000
        ).toUTCString()}`
      );
      return response;
    } else {
      return new Response("Nombre y valor de cookie no proporcionados", {
        status: 400,
      });
    }
  } catch (e) {
    // console.log(e);
    return new Response("Error interno del servidor", { status: 500 });
  }
};
