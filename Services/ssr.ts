import {
  API_URL,
  IP_API,
  NOTE_SPECIALITIES,
  baseUrl,
} from "@/data/api";
import { countries } from "@/data/countries";
import {
  setAllCourses,
  setLoadingBestSellers,
  setLoadingCourses,
} from "@/lib/allData";
import {SignUp} from "@/data/types";

let validCountries = countries.map((item) => item.id);

const PROD = process.env.PROD;

const apiProfileUrl = `${baseUrl}/api/profile`;

class ApiSSRService {
  token = typeof window !== "undefined" ? localStorage.getItem("tokenLogin") : null;

  async getCountryCode() {
    try {
      const ipResponse = await fetch("https://api.ipify.org/?format=json");
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      let response;
      if (PROD) {
        response = await fetch(`${IP_API}?ip=${ip}`);
      } else {
        response = await fetch(
          `https://pro.ip-api.com/json/?fields=61439&key=OE5hxPrfwddjYYP`
        );
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch country code. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      if (PROD) {
        return data.data;
      }

      return data.countryCode ? data.countryCode.toLowerCase() : "";
    } catch (error) {
      console.error("Network error:", error);
      return "";
    }
  }

  async getAllCourses(country?: string, tag?: string) {
    setLoadingCourses(true);

    let validCountries = countries.map((item) => item.id);
    let countryParam = "&country=int";

    if (country && validCountries.includes(country)) {
      countryParam = `&country=${country}`;
    }

    const tagParam = tag ? `&tag=${tag}` : "";

    try {
      const queryParams = [countryParam, tagParam].filter(Boolean).join("");

     const response = await fetch(
        `${API_URL}/products?limit=-1${queryParams}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch courses. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      setAllCourses(data.products);
      setLoadingCourses(false);

      return data.products;
    } catch (error) {
      console.error("Network error:", error);
      return error;
    }
  }

  async getBestSellers(country?: string, tag?: string) {
    setLoadingBestSellers(true);

    try {
      let countryParam = "int";
      let validCountries = countries.map((item) => item.id);

      if (country && validCountries.includes(country)) {
        countryParam = `${country}`;
      }

      //console.log('getBestSellers URL', `${API_URL}/home/best-sellers?country=${countryParam}`);
      const response = await fetch(
        `${API_URL}/home/best-sellers?country=${countryParam}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch best sellers. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      setLoadingBestSellers(false);

      return data.products;
    } catch (error) {
      setLoadingBestSellers(false);
      console.error("Network error:", error);
      return error;
    }
  }

  async getPosts(country?: string) {
    try {
      let currentYear = new Date().getFullYear();
      let validCountries = countries.map((item) => item.id);
      let countryParam = "int";

      if (country && validCountries.includes(country)) {
        countryParam = `${country}`;
      }

      console.log('getPosts URL', `${API_URL}/posts?year=${currentYear}&country=${countryParam}`);
      const response = await fetch(
        `${API_URL}/posts?year=${currentYear}&country=${countryParam}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch posts. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      const postsList = data.posts.map((post: any) => ({
        ...post,
        image: post.thumbnail,
      }));

      return postsList;
    } catch (error) {
      console.error("Network error:", error);
      return [];
    }
  }

  async getSingleProduct(slug: string, country: string) {
    try {
      const response = await fetch(
        `${API_URL}/product/${slug}?country=${country}`
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch single product. HTTP status ${response.status}`
        );
      }

      const data = await response.json();

      return { product: data };
    } catch (error) {
      console.error("Network error:", error);
      return { error };
    }
  }

  async getSinglePost(slug: string) {
    try {
      const response = await fetch(`${API_URL}/posts/${slug}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch single post. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data.posts[0];
    } catch (error) {
      console.error("Network error:", error);
      return { error };
    }
  }

  async fetchPostsSpecialities(): Promise<{
    fiveSpecialtiesGroup: any;
    allSpecialtiesGroup: any;
  }> {
    try {
      const response = await fetch(NOTE_SPECIALITIES);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch post specialties. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      const allSpecialtiesGroup = data.specialities;
      const fiveSpecialtiesGroup = data.specialities.slice(0, 5);
      return { allSpecialtiesGroup, fiveSpecialtiesGroup };
    } catch (error) {
      console.error("Network error:", error);
      return { allSpecialtiesGroup: [], fiveSpecialtiesGroup: [] };
    }
  }
  async getSpecialtiesStore(country: string) {
    try {
      let validCountries = countries.map((item) => item.id);
      const countryParam = validCountries.includes(country)
        ? `&country=${country}`
        : `&country=int`;

      const response = await fetch(
        `${API_URL}/products-specialities?${countryParam}`
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch post specialties. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data.specialities.map(
        (specialty: {
          speciality_name: string;
          products: number;
          image: string;
        }) => {
          return {
            name: specialty.speciality_name,
            products: specialty.products,
            image: specialty.image,
          };
        }
      );
    } catch (error) {
      return error;
    }
  }

  async getAllProfessions() {
    try {
      //console.log('Get professions 1');
      const response = await fetch(`${baseUrl}/api/store/professions`);

      const data = await response.json();

      // Modify slug based on profession name
      data.map((profession: any) => {
        switch (profession.name) {
          case "Personal médico":
            profession.slug = "medicos";
            break;
          case "Personal de enfermería y auxiliares":
            profession.slug = "enfermeros-auxiliares";
            break;
          case "Otra profesión":
            profession.slug = "otra-profesion";
            break;
        }
      });

      return data;
    } catch (error) {
      return error;
    }
  }

  async getWpContent(endpoint:string,country: string) {
    try {
      let validCountries = countries.map((item) => item.id);
      const countryParam = validCountries.includes(country)
        ? `&country=${country}`
        : `&country=int`;
      
        //console.log(`${API_URL}${endpoint}${countryParam}`)
      
        const response = await fetch(`${API_URL}${endpoint}?${countryParam}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${endpoint}. HTTP status ${response.status}`
        );
      }

      const data = await response.json();
      return data
    } catch (error) {
      return error;
    }
  }

  async getEmailByIdZohoCRM(module: string, email: string) {
    try {
      const response = await fetch(`${baseUrl}/api/crm/GetByEmail/${module}/${email}`);

      if (!response.ok) {
        throw new Error(
            `Failed to get email by ID from Zoho CRM. HTTP status ${response.status}`
        );
      }

      let { data } = await response.json();
     // console.log({data: data[0]})
      return data[0]
    } catch (error) {
      return error;
    }
  }

  async getUserData() {
    if (typeof window !== "undefined") {
      const email = localStorage.getItem("email");
      
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          
          const response = await fetch(`${apiProfileUrl}/${email}`, {
            headers: {
              ...headers,
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(
              `Failed to get user data. HTTP status ${response.status}`
            );
          }

          const data = await response.json();
          return data.user;
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // console.log({error});
      }
    }
  }

  async postSignUp(jsonData: SignUp) {
    try {
      const response = await fetch(`${baseUrl}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(jsonData),
      });


      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        console.log(response);
        return response;
      }
    } catch (e) {
      console.error("Error in postSignUp:", e);
      return null; // Or handle the error as needed
    }
  }

}

export default new ApiSSRService();
