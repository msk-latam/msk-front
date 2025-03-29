export interface Product {
  id: number;
  related_tag: number[];
  father_id: number;
  slug: string;
  father_post_type: string;
  language_code: string;
  language_name: string;
  product_code: number;
  featured_product_text: string;
  title: string;
  image: string;
  thumbnail: Thumbnail;
  categories: Category[];
  professions: Profession[];
  duration: any;
  permalink: string;
  temario: string;
  cantidad_modulos: number;
  why_course: string;
  is_new: boolean;
  nac_schools: any;
  int_schools: any;
  isbn: any;
  purchase_option: string;
  diploma: any;
  is_free: boolean;
  sale_price: string;
  regular_price: string;
  total_price: string;
  max_installments: string;
  price_installments: string;
  created_at: string;
}

export interface Thumbnail {
  high: string;
  medium: string;
  low: string;
}

export interface Category {
  term_id: number;
  name: string;
  slug: string;
}

export interface Profession {
  title: string;
  name: string;
}
