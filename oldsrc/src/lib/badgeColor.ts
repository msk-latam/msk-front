import { FetchPostType } from "@/data/types";

export const badgeColorOld = (item: FetchPostType) => {
  // console.log(item.categories);
  switch (item.categories[0].name) {
    case "Medicina":
      return "blue-post";
    case "Enfermería":
      return "green-post";
    case "Actualidad":
      return "yellow-strong-post";
    case "Opinión":
      return "red-post";
    case "E-learning":
      return "orange-post";
    case "Fuera de guardia":
      return "emerald-post";
    case "E-health":
      return "yellow-post";
    case "Entrevistas":
      return "brown-post";
    default:
      return "yellow";
  }
};

export const badgeColor = (name: string) => {
  switch (name) {
    case "Medicina":
      return "blue-post";
    case "Enfermería":
      return "green-post";
    case "Actualidad":
      return "yellow-strong-post";
    case "Opinión":
      return "red-post";
    case "E-learning":
      return "orange-post";
    case "Fuera de guardia":
      return "emerald-post";
    case "E-health":
      return "yellow-post";
    case "Entrevistas":
      return "brown-post";
    default:
      return "yellow";
  }
};
