interface Partner {
  id: number;
  name: string;
  logo?: string;
}

interface InstitutionCategory {
  id: number;
  name: string;
  image?: string;
  institutions?: Partner[];
}

const partners: Partner[] = [
  { id: 1, name: "Partner 1" },
  { id: 2, name: "Partner 2" },
  { id: 3, name: "Partner 3" },
  { id: 4, name: "Partner 4" }
];

const institutions: InstitutionCategory[] = [
  {
    id: 1,
    name: "Universidades",
    image: "/images/institutions/universities.jpg",
    institutions: [
      { id: 101, name: "Universidad Nacional" },
      { id: 102, name: "Universidad Autónoma" },
      { id: 103, name: "Universidad Politécnica" }
    ]
  },
  {
    id: 2,
    name: "Empresas",
    image: "/images/institutions/companies.jpg",
    institutions: [
      { id: 201, name: "Empresa A" },
      { id: 202, name: "Empresa B" },
      { id: 203, name: "Empresa C" }
    ]
  },
  {
    id: 3,
    name: "Alianzas",
    image: "/images/institutions/alliances.jpg",
    institutions: [
      { id: 301, name: "Alianza X" },
      { id: 302, name: "Alianza Y" },
      { id: 303, name: "Alianza Z" }
    ]
  }
];

export { institutions, partners };
export default institutions;