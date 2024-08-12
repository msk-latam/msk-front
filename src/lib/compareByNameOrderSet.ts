const priorityOrder = [
  'Medicina',
  'Enfermería',
  'E-learning',
  'Actualidad',
  'Entrevistas',
  'Opinión',
];
export const compareByNameOrderSet = (a: any, b: any) => {
  const aPriority = priorityOrder.indexOf(a.name.split('-')[0]);
  const bPriority = priorityOrder.indexOf(b.name.split('-')[0]);

  if (aPriority === -1 || bPriority === -1) {
    return a.slug.localeCompare(b.slug);
  }

  return aPriority - bPriority;
};
