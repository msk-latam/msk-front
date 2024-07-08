import NcImage from "@/components/NcImage/NcImage";
import NcLink from "@/components/NcLink/NcLink";
import useSpecialtiesPosts, {
  SpecialitiePost,
} from "@/hooks/useSpecialtiesPosts";

import { FC, useEffect, useState } from "react";

interface Props {
  email?: string;
  setShow: (state: boolean) => void;
}
const SpecialtiesModal: FC<Props> = ({ email, setShow }) => {
  const { allSpecialtiesGroups, loading } = useSpecialtiesPosts();
  const [specialties, setSpecialties] = useState<SpecialitiePost[]>([]);

  useEffect(() => {
    setSpecialties(
      allSpecialtiesGroups.map((item) => {
        item.speciality_name === "Medicina general"
          ? (item.url_query = "Medicina")
          : (item.url_query = item.speciality_name);
        return item;
      })
    );
  }, [allSpecialtiesGroups]);

  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
      {loading ? (
        <>
          {loadingArray.map((i) => (
            <div key={`loading_${i}`} className="flex gap-2 items-center">
              <div
                role="status"
                className="flex items-center justify-center h-12 w-12 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
              ></div>
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
            </div>
          ))}
        </>
      ) : (
        specialties.map(
          ({ speciality_name, image, articles, url_query }, index) => (
            <NcLink
              href={`/archivo?especialidad=${url_query}`}
              onClick={() => setShow(false)}
              key={`sp__${index}`}
              className="flex gap-2 items-center"
            >
              <NcImage
                containerClassName="flex-shrink-0 h-10 w-10 rounded-lg overflow-hidden lg:h-12 lg:w-12"
                src={image}
                alt=""
                width="100"
                height="100"
              />
              <p className="flex flex-col col-span-3">
                <span className="text-sm text-neutral-700 font-normal">
                  {" "}
                  {speciality_name ?? "Otras"}
                </span>
                <span className="text-xs text-neutral-500">
                  {articles} artículos
                </span>
              </p>
            </NcLink>
          )
        )
      )}
    </div>
  );
};

export default SpecialtiesModal;
