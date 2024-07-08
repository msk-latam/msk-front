import React, { FC } from "react";
import ItemSkeleton from "@/components/Skeleton/ItemSkeleton";

const StoreSkeleton: FC = () => {
    const items =["card"];
    return (
        <>
          <div className={"mt-5"}>
            {items.map((el,i) => <ItemSkeleton key={`${el}_${i}`} className="" />)}
          </div>
        </>
    );
};

export default StoreSkeleton;
