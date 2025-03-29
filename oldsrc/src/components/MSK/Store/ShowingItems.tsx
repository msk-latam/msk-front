import React, { FC } from "react";

const ShowingItems: FC<{ length: number, showingCount: number }> = ({ length, showingCount }) => {
  let showingCountAux = showingCount > length ? length : showingCount;
  return (
    <div className="curse-tab-left-wrap">
      <div className="course-results">
        Mostrando {showingCountAux} de {length} resultados
      </div>
    </div>
  );
};

export default ShowingItems;
