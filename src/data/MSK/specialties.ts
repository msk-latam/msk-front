import { Specialty } from "../types";

const SPECIALTIES: Specialty[] = [
  {
    id: 1,
    name: "Cardiología",
    href: "/tienda?especialidad=cardiologia",
  },
  {
    id: 2,
    name: "Enfermería",
    href: "/tienda?especialidad=enfermeria",
  },
  {
    id: 3,
    name: "Medicina general",
    href: "/tienda?especialidad=medicina-general",
  },
  {
    id: 4,
    name: "Infectología",
    href: "/tienda?especialidad=infectologia",
  },
  {
    id: 5,
    name: "Anestesiología",
    href: "/tienda",
  },
  {
    id: 6,
    name: "Nutrición",
    href: "/tienda",
  },
  {
    id: 7,
    name: "Medicina Interna",
    href: "/tienda",
  },
];
const HOME_SPECIALTIES: Specialty[] = [
  {
    id: 1,
    name: "Cardiología",
    href: "/tienda?especialidad=cardiologia&recurso=curso",
  },
  {
    id: 2,
    name: "Emergentología",
    href: "/tienda?especialidad=emergentologia&recurso=curso",
  },
  {
    id: 3,
    name: "Medicina general",
    href: "/tienda?especialidad=medicina-general&recurso=curso",
  },
  {
    id: 4,
    name: "Infectología",
    href: "/tienda?especialidad=infectologia&recurso=curso",
  },
  {
    id: 5,
    name: "Anestesiología",
    href: "/tienda",
  },
  {
    id: 6,
    name: "Nutrición",
    href: "/tienda",
  },
  {
    id: 7,
    name: "Medicina Interna",
    href: "/tienda",
  },
];

const CATEGORIES: Specialty[] = [
  { name: "Anestesiología y dolor", id: 1 },
  { name: "Cardiología", id: 2 },
  { name: "Cirugía", id: 3 },
  { name: "Dermatología", id: 4 },
  { name: "Diabetes", id: 5 },
  { name: "Emergentología", id: 6 },
  { name: "Gastroenterología", id: 7 },
  { name: "Geriatría", id: 8 },
  { name: "Ginecología", id: 9 },
  { name: "Infectología", id: 10 },
  { name: "Inglés técnico", id: 11 },
  { name: "Kinesiología", id: 12 },
  { name: "Medicina familiar", id: 13 },
  { name: "Medicina general", id: 14 },
  { name: "Medicina intensiva", id: 15 },
  { name: "Nutrición", id: 16 },
  { name: "Obstetricia", id: 17 },
  { name: "Odontología", id: 18 },
  { name: "Oftalmología", id: 19 },
  { name: "Oncología", id: 20 },
  { name: "Psicología", id: 21 },
  { name: "Psiquiatría", id: 22 },
  { name: "Pediatría", id: 23 },
  { name: "Hematología", id: 24 },
  { name: "Traumatología", id: 25 },
];

export { HOME_SPECIALTIES, SPECIALTIES, CATEGORIES };
