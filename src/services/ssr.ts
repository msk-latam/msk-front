import { API_URL, IP_API, NOTE_SPECIALITIES, baseUrl } from '@/data/api';
import { countries } from '@/data/countries';
import {
  setAllCourses,
  setLoadingBestSellers,
  setLoadingCourses,
  setStoreCourses,
} from '@/lib/allData';
import { FetchSingleProduct, SignUp, UserProfile } from '@/data/types';
import { BASE_URL, IS_PROD, SITE_URL } from '@/contains/constants';
import { BodyNewPassword } from '@/components/MSK/PageNewPassword';
import { notFound } from 'next/navigation';

let validCountries = countries.map(item => item.id);

const PROD = IS_PROD;

const apiProfileUrl = `${BASE_URL}/api/profile`;

class ApiSSRService {
  token =
    typeof window !== 'undefined' ? localStorage.getItem('tokenLogin') : null;

  async getCountryCode() {
    try {
      const ipResponse = await fetch('https://api.ipify.org/?format=json');
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      let response;
      if (PROD) {
        response = await fetch(`${IP_API}?ip=${ip}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
      } else {
        response = await fetch(
          `https://pro.ip-api.com/json/?fields=61439&key=OE5hxPrfwddjYYP`,
        );
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch country code. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();

      if (PROD) {
        return data.data;
      }

      return data.countryCode ? data.countryCode.toLowerCase() : '';
    } catch (error) {
      console.error('Network error:', error);
      return '';
    }
  }

  async getAllCourses(
    country?: string,
    tag?: string,
    withAll: boolean = false,
    currentUrl = '',
  ) {
    setLoadingCourses(true);

    let validCountries = countries.map(item => item.id);
    let onValidCountry = country && validCountries.includes(country);

    const countryParam = onValidCountry
      ? `&country=${country}`
      : '&country=int';

    if (!tag) {
      let tagFromURL = new URLSearchParams(currentUrl).get('tag');
      tag = tagFromURL ? tagFromURL : '';
    }
    let tagParam = tag ? `&tag=${tag}` : '';
    const withAllParam = withAll ? '&filter=all' : '';

    try {
      const queryParams = [countryParam, tagParam, withAllParam]
        .filter(Boolean)
        .join('');

      const response = await fetch(
        `${API_URL}/products?limit=-1${queryParams}&asd=tes2`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch courses. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();

      setAllCourses(data.products);
      setLoadingCourses(false);

      return data.products;
    } catch (error) {
      console.error('Network error:', error);
      return error;
    }
  }

  async getStoreCourses(country?: string, currentUrl = '') {
    setLoadingCourses(true);

    let validCountries = countries.map(item => item.id);
    let onValidCountry = country && validCountries.includes(country);

    const countryParam = onValidCountry
      ? `&country=${country}`
      : '&country=int';

    let tagParam = '';
    const tag = new URLSearchParams(window.location.search).get('tag');

    if (tag) {
      tagParam = `&tag=${tag}`;
    }

    try {
      const queryParams = [countryParam, tagParam].filter(Boolean).join('');
      const response = await fetch(
        `${API_URL}/products?limit=-1${queryParams}&asd=tes`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch courses. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();

      setStoreCourses(data.products);
      setLoadingCourses(false);

      return data.products;
    } catch (error) {
      console.error('Network error:', error);
      return error;
    }
  }

  async getBestSellers(country?: string, tag?: string) {
    setLoadingBestSellers(true);

    try {
      let countryParam = 'int';
      let validCountries = countries.map(item => item.id);

      if (country && validCountries.includes(country)) {
        countryParam = `${country}`;
      }

      console.log(
        'getBestSellers URL',
        `${API_URL}/home/best-sellers?country=${countryParam}`,
      );
      const response = await fetch(
        `${API_URL}/home/best-sellers?country=${countryParam}`,
      );

      console.log(country);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch best sellers. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();

      setLoadingBestSellers(false);

      return data.products;
    } catch (error) {
      setLoadingBestSellers(false);
      console.error('Network error:', error);
      return error;
    }
  }

  async getPosts(country?: string) {
    try {
      let currentYear = new Date().getFullYear();
      let validCountries = countries.map(item => item.id);
      let countryParam = 'int';

      if (country && validCountries.includes(country)) {
        countryParam = `${country}`;
      }

      const response = await fetch(
        `${API_URL}/posts?year=${currentYear}&country=${countryParam}&limit=-1`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch posts. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();

      const postsList = data.posts.map((post: any) => ({
        ...post,
        image: post.thumbnail,
      }));

      return postsList;
    } catch (error) {
      console.error('Network error:', error);
      return [];
    }
  }

  async getSingleProduct(slug: string, country: string) {
    try {
      const response = await fetch(
        `${API_URL}/product/${slug}?country=${country}`,
      );
      console.log(`${API_URL}/product/${slug}?country=${country}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch single product. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();
      return { product: data };
    } catch (error) {
      console.error('Network error:', error);
      notFound();
      return { error };
    }
  }

  async getSinglePost(slug: string, country: string) {
    console.log(
      { slug, country },
      `${API_URL}/posts/${slug}?country=${country}`,
    );
    try {
      const response = await fetch(
        `${API_URL}/posts/${slug}?country=${country}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch single post. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();
      return data.posts;
    } catch (error) {
      console.error('Network error:', error);
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
          `Failed to fetch post specialties. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();
      const allSpecialtiesGroup = data.specialities;
      const fiveSpecialtiesGroup = data.specialities.slice(0, 5);
      return { allSpecialtiesGroup, fiveSpecialtiesGroup };
    } catch (error) {
      console.error('Network error:', error);
      return { allSpecialtiesGroup: [], fiveSpecialtiesGroup: [] };
    }
  }

  async getSpecialtiesStore(country: string) {
    try {
      // Comprobamos si `window` está definido
      if (typeof window === 'undefined') {
        console.log('Se está ejecutando en un entorno sin window.');
        return []; // Devuelve un array vacío o maneja la lógica para entornos del lado del servidor
      }

      const COUNTRY_TTL = 24 * 60 * 60 * 1000; // TTL de 24 horas
      const storedData = localStorage.getItem(`specialties_${country}`);

      // Comprobamos si hay datos almacenados y si no han expirado
      if (storedData) {
        const { value, timestamp } = JSON.parse(storedData);
        const now = new Date().getTime();
        if (now - timestamp < COUNTRY_TTL) {
          console.log('specialtystore obtenidos de localStorage');
          return value; // Devuelve los datos almacenados
        }
      }

      // Si no hay datos válidos en localStorage, hacemos la llamada a la API
      let validCountries = countries.map(item => item.id);
      const countryParam = validCountries.includes(country)
        ? `&country=${country}`
        : `&country=int`;

      const response = await fetch(
        `${API_URL}/products-specialities?${countryParam}`,
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch post specialties. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();

      // Almacenamos los datos en localStorage
      localStorage.setItem(
        `specialties_${country}`,
        JSON.stringify({
          value: data.specialities.map(
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
            },
          ),
          timestamp: new Date().getTime(), // Guardamos el timestamp actual
        }),
      );

      console.log('Datos obtenidos de la API specialstore');
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
        },
      );
    } catch (error) {
      console.error('Error en la función getSpecialtiesStore:', error);
      return []; // Devuelve un array vacío en caso de error
    }
  }

  async getAllProfessions() {
    try {
      const PROFESSIONS_TTL = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
      let storedProfessions;

      // Verificar si estamos en un entorno de navegador
      if (typeof window !== 'undefined') {
        storedProfessions = localStorage.getItem('allProfessions');
      }

      // Comprobar si hay datos en localStorage y si son válidos
      if (storedProfessions) {
        const { value, timestamp } = JSON.parse(storedProfessions);
        const now = new Date().getTime();
        if (now - timestamp < PROFESSIONS_TTL) {
          console.log('All professions tomados de localStorage');
          return value; // Retorna los datos almacenados
        }
      }

      console.log('Llamando a la API para obtener todas las profesiones');
      const response = await fetch(`${baseUrl}/api/store/professions`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch all professions. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();

      // Modificar el slug según el nombre de la profesión
      data.map((profession: any) => {
        switch (profession.name) {
          case 'Personal médico':
            profession.slug = 'medicos';
            break;
          case 'Personal de enfermería y auxiliares':
            profession.slug = 'enfermeros-auxiliares';
            break;
          case 'Otra profesión':
            profession.slug = 'otra-profesion';
            break;
        }
      });

      // Guardar los datos en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'allProfessions',
          JSON.stringify({
            value: data,
            timestamp: new Date().getTime(),
          }),
        );
      }

      return data;
    } catch (error) {
      console.error('Error de red:', error);
      return [];
    }
  }

  // async getProfessions() {
  //   try {
  //     //console.log('Get professions 2');
  //     const response = await fetch(`${baseUrl}/api/professions`);

  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to fetch professions. HTTP status ${response.status}`,
  //       );
  //     }

  //     const data = await response.json();
  //     console.log('getProfessions', { data });
  //     return data;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  async getProfessions() {
    const PROFESSIONS_TTL = 24 * 60 * 60 * 1000;
    try {
      if (typeof window !== 'undefined') {
        const storedProfessions = localStorage.getItem('professions');
        // console.log(storedProfessions);
        if (storedProfessions) {
          const { data, timestamp } = JSON.parse(storedProfessions);
          const now = new Date().getTime();
          // console.log(data);

          if (now - timestamp < PROFESSIONS_TTL) {
            return data;
          }
        }
      }

      // Si no hay datos o el TTL ha expirado, realizar una nueva llamada a la API
      console.log('haciendo llamada api');
      const response = await fetch(`${baseUrl}/api/professions`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch professions. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();
      console.log('getProfessions', { data });

      // Guardar los datos en localStorage solo si estamos en el cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'professions',
          JSON.stringify({
            data,
            timestamp: new Date().getTime(), // Guardar el tiempo actual
          }),
        );
      }

      return data;
    } catch (error) {
      console.error('Error de red:', error);
      return error;
    }
  }

  async getSpecialties() {
    try {
      const response = await fetch(`${baseUrl}/api/specialities`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch specialties. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();
      return data.specialities;
    } catch (error) {
      return error;
    }
  }

  async getSpecialtiesAndGroups() {
    try {
      const SPECIALTIES_TTL = 24 * 60 * 60 * 1000; // 24 horas en milisegundos
      let storedSpecialties;

      // Verificar si estamos en un entorno de navegador
      if (typeof window !== 'undefined') {
        storedSpecialties = localStorage.getItem('specialtiesAndGroups');
      }

      // Comprobar si hay datos en localStorage y si son válidos
      if (storedSpecialties) {
        const { value, timestamp } = JSON.parse(storedSpecialties);
        const now = new Date().getTime();
        if (now - timestamp < SPECIALTIES_TTL) {
          console.log('especialidades tomados de localStorage');
          return value; // Retorna los datos almacenados
        }
      }

      console.log('Llamando a la API para obtener especialidades y grupos');
      const response = await fetch(`${baseUrl}/api/specialities`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch specialties and groups. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();

      // Guardar los datos en localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'specialtiesAndGroups',
          JSON.stringify({
            value: data,
            timestamp: new Date().getTime(),
          }),
        );
      }

      return data;
    } catch (error) {
      console.error('Error de red:', error);
      return [];
    }
  }

  async getWpContent(endpoint: string, country: string) {
    try {
      let validCountries = countries.map(item => item.id);
      const countryParam = validCountries.includes(country)
        ? `&country=${country}`
        : `&country=int`;

      //console.log(`${API_URL}${endpoint}${countryParam}`)

      const response = await fetch(`${API_URL}${endpoint}?${countryParam}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${endpoint}. HTTP status ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  async getEmailByIdZohoCRM(module: string, email: string) {
    try {
      const response = await fetch(
        `${baseUrl}/api/crm/GetByEmail/${module}/${email}`,
      );

      if (!response.ok) {
        throw new Error(
          `Failed to get email by ID from Zoho CRM. HTTP status ${response.status}`,
        );
      }

      let { data } = await response.json();
      // console.log({data: data[0]})
      return data[0];
    } catch (error) {
      return error;
    }
  }

  async getUserData() {
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem('email');

      try {
        const token = localStorage.getItem('token');
        if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await fetch(`${apiProfileUrl}/${email}`, {
            headers: {
              ...headers,
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(
              `Failed to get user data. HTTP status ${response.status}`,
            );
          }

          const data = await response.json();
          return data.user;
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        console.log({ error });
      }
    }
  }

  async postSignUp(jsonData: SignUp) {
    try {
      //
      const response = await fetch(`${baseUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        console.log(response);
        return response;
      }
    } catch (e) {
      console.error('Error in postSignUp:', e);
      return e; // Or handle the error as needed
    }
  }

  async postRecover(jsonData: { email: string }): Promise<Response> {
    try {
      const response = await fetch(`${baseUrl}/api/RequestPasswordChange`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(`Failed to recover. HTTP status ${response.status}`);
      }

      return response;
    } catch (error) {
      // @ts-ignore
      return error;
    }
  }

  async postNewPassword(jsonData: BodyNewPassword) {
    try {
      const response = await fetch(`${baseUrl}/api/newPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to post new password. HTTP status ${response.status}`,
        );
      }

      return await response.json();
    } catch (error) {
      console.error('Network error:', error);
      return error;
    }
  }

  async postPaymentMercadoPago(paymentData: any) {
    console.log(paymentData);
    try {
      const response = await fetch(
        // `http://localhost:8000/api/gateway/api/mercadopago/arg/our_test`,
        `https://payment.msklatam.net/api/gateway/api/mercadopago/arg/our_test`,
        // `${baseUrl}/api/gateway/api/mercadopago/arg/our_test/`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer $2y$12$zg.e9Gk2MpnXHrZfdJcFOuFsCdBh/kzrb61aiLSbDRFBruRwCqkZ6`,
          },
          body: JSON.stringify(paymentData),
        },
      );

      // console.log({ data });

      if (response.status == 200) {
        const data = await response.json();
        console.log('Pago ok', { data });
        return data;
      }
    } catch (err) {
      console.error('Pago error', { err });
    }
  }

  // async createDrafContract(
  //   product: FetchSingleProduct,
  //   profile: UserProfile | null,
  // ) {
  //   console.log({ product, profile });
  //   const body = {
  //     customer_id: profile?.entity_id_crm,
  //     products: [
  //       {
  //         code: product.ficha.product_code,
  //         quantity: 1,
  //         total: product.total_price,
  //       },
  //     ],
  //     status: 'Borrador',
  //     currency: 'ARS',
  //     country: 'Argentina',
  //     grand_total: product?.total_price,
  //   };

  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/api/gateway/api/mercadopago/arg/our_test`,
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',

  //           Authorization: `Bearer $2y$12$tdFqIBqa413sfYENjGjVR.lUOfcRnRaXBgBDUeQIBg1BjujlLbmQW`, //este token va asi
  //         },
  //         body: JSON.stringify(body),
  //       },
  //     );

  //     // if (!response.ok) {
  //     //   throw new Error(`HTTP error! status: ${response.status}`);
  //     // }
  //     console.log({ body });
  //     console.log({ response });
  //     const data = response.json();
  //     console.log({ data });

  //     return data;
  //   } catch (err) {
  //     console.error('Pago error', { err });
  //     return { error: true, message: '' };
  //   }
  // }

  buildDraftContractBody(
    product: FetchSingleProduct,
    profile: UserProfile | null,
  ) {
    const body = {
      customer_id: profile?.entity_id_crm,
      products: [
        {
          code: product.ficha.product_code,
          quantity: 1,
          total: product.total_price,
          net_total: product.totalAmount,
          list_price: product.totalAmount,
        },
      ],
      status: 'Borrador',
      currency: 'ARS',
      country: 'Argentina',
      sub_total: product.total_price,
      grand_total: product?.total_price,
    };

    console.log({ body });

    return body;
  }

  async callDraftContractApi(body: object) {
    console.log({ body });
    try {
      const response = await fetch(
        `https://payment.msklatam.net/api/msk-crm/api/zoho/sales_order/create_contract`,
        // `http://crm.msklatam.net/api/zoho/sales_order/create_contract`,
        // `http://127.0.0.1:8000/api/gateway/api/mercadopago/arg/our_test`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer $2y$12$tdFqIBqa413sfYENjGjVR.lUOfcRnRaXBgBDUeQIBg1BjujlLbmQW`, // token fijo
          },
          body: JSON.stringify(body),
        },
      );

      const data = await response.json();
      console.log({ data });

      return data;
    } catch (err) {
      console.error('Pago error', { err });
      return { error: true, message: '' };
    }
  }

  async createDraftContract(
    product: FetchSingleProduct,
    profile: UserProfile | null,
  ) {
    const body = this.buildDraftContractBody(product, profile);
    console.log({ body });

    const data = await this.callDraftContractApi(body);

    return data;
  }
}

export default new ApiSSRService();
