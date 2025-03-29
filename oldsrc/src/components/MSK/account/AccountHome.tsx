import { FC } from "react";

interface DashboardRootProps {
  name: string;
}

const DashboardRoot: FC<DashboardRootProps> = ({ name }) => {
  return (
    <div className="rounded-xl min-h-full text-sm border border-neutral-100 dark:border-neutral-800 p-6 md:text-base">
      <span className="block text-lg mb-3 flex gap-2">
        <img src="/images/icons/wave.svg" alt="Wave" />
        Hola, {name}
      </span>
      En este panel encontrarás detalles de tus cursos adquiridos, además de
      poder editar información de tu perfil y tu contraseña de acceso.
    </div>
  );
};

export default DashboardRoot;
