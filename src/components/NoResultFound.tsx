import React from "react";

const NoResultFound = () => (<div
    className="text-center col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center h-[350px]">
    <img src="/images/icons/no_items.svg" className="mb-5"/>
    <p>
        No hay resultados para tu búsqueda.
        <br/>
        Modifica los filtros y encuentra tu curso ideal.
    </p>
</div>)

export default NoResultFound;