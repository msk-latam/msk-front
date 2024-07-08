import { FC, useEffect, useState } from "react";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";
import { slugifySpecialty } from "@/lib/Slugify";
import resourcesMapping from "../../../data/jsons/__resources.json";
import durationsMapping from "../../../data/jsons/__durations.json";
import { useStoreFilters } from "@/context/storeFilters/StoreProvider";

interface Props {
  onChangeSpecialty: (specialty: any, action: string) => void;
  onChangeProfession: (profession: Profession) => void;
  onChangeResource: (resource: ResourceFilter, action: string) => void;
  onChangeDuration: (duration: DurationFilter, action: string) => void;
}

let resources = resourcesMapping;
let durations = durationsMapping;

const StoreSideBar: FC<Props> = ({
  onChangeSpecialty,
  onChangeProfession,
  onChangeResource,
  onChangeDuration,
}) => {
  const [specialtyVisible, setSpecialtyVisible] = useState<boolean>(true);
  const [resourceVisible, setResourceVisible] = useState<boolean>(false);
  const [professionVisible, setProfessionVisible] = useState<boolean>(false);
  const [durationVisible, setDurationVisible] = useState<boolean>(false);

  let specialties: Specialty[] = useStoreFilters().specialties;
  let professions: Profession[] = useStoreFilters().professions;

  const { storeFilters } = useStoreFilters();

  const toggleSpecialtyVisibility = () => {
    setSpecialtyVisible((prevVisible) => !prevVisible);
  };
  const toggleResourceVisibility = () => {
    setResourceVisible((prevVisible) => !prevVisible);
  };
  const toggleProfessionVisibility = () => {
    setProfessionVisible((prevVisible) => !prevVisible);
  };
  const toggleDurationVisibility = () => {
    setDurationVisible((prevVisible) => !prevVisible);
  };

  const setSpecialtyFilter = (specialty: Specialty, action: string) => {
    onChangeSpecialty(specialty, action);
  };

  const setResourceFilter = (resource: ResourceFilter, action: string) => {
    onChangeResource(resource, action);
  };

  const setProfessionFilter = (profession: Profession, action: string) => {
    onChangeProfession(profession);
  };

  const setDurationFilter = (duration: DurationFilter, action: string) => {
    onChangeDuration(duration, action);
  };

  return (
    <>
      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            specialtyVisible ? "content-visible" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={toggleSpecialtyVisibility}>
            Especialidades
          </h3>
          {specialties && specialties.length ? (
            <ul>
              {specialties.map((specialty, index) => {
                return (
                  <li key={`spe_${index}`}>
                    <div className="course-sidebar-list">
                      <input
                        className="edu-check-box bg-transparent border-none text-transparent focus:ring-0 focus:ring-offset-0"
                        type="checkbox"
                        id={`specialty_${specialty.name}`}
                        onChange={(e) =>
                          setSpecialtyFilter(
                            specialty,
                            e.target.checked ? "add" : "delete"
                          )
                        }
                        checked={
                          !!storeFilters.specialties.find(
                            (item: Specialty) => item.name == specialty.name
                          )
                        }
                      />
                      <label
                        className="edu-check-label"
                        htmlFor={`specialty_${specialty.name}`}
                      >
                        {specialty.name}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            resourceVisible ? "content-visible" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={toggleResourceVisibility}>
            Recurso
          </h3>
          {resourceVisible && (
            <ul>
              {resources.map((resource, index) => {
                return (
                  <li key={`res_${index}`}>
                    <div className="course-sidebar-list">
                      <input
                        className="edu-check-box bg-transparent border-none text-transparent focus:ring-0 focus:ring-offset-0"
                        type="checkbox"
                        id={`res_${resource.id}`}
                        checked={
                          !!storeFilters.resources.find(
                            (item: ResourceFilter) => item.slug == resource.slug
                          )
                        }
                        onChange={(e) =>
                          setResourceFilter(
                            resource,
                            e.target.checked ? "add" : "delete"
                          )
                        }
                      />
                      <label
                        className="edu-check-label"
                        htmlFor={`res_${resource.id}`}
                      >
                        {resource.name}{" "}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            professionVisible ? "content-visible" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={toggleProfessionVisibility}>
            Profesión
          </h3>
          {professions && professions.length ? (
            <ul>
              {professions.map((profession, index: number) => {
                return (
                  <li key={index}>
                    <div className="course-sidebar-list">
                      <input
                        className="edu-check-box"
                        type="checkbox"
                        id={`profession_${profession.id}`}
                        checked={
                          !!storeFilters.professions.find(
                            (item: Profession) => item.slug == profession.slug
                          )
                        }
                        onChange={(e) =>
                          setProfessionFilter(
                            profession,
                            e.target.checked ? "add" : "delete"
                          )
                        }
                      />
                      <label
                        className="edu-check-label"
                        htmlFor={`profession_${profession.id}`}
                      >
                        {profession.name}
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="course-sidebar-widget mb-2">
        <div
          className={`course-sidebar-info ${
            durationVisible ? "content-visible" : "content-hidden"
          }`}
        >
          <h3 className="drop-btn" onClick={toggleDurationVisibility}>
            Duración
          </h3>
          <ul>
            {durations.map((duration, index) => {
              return (
                <li key={`dur_${index}`}>
                  <div className="course-sidebar-list">
                    <input
                      className="edu-check-box"
                      type="checkbox"
                      id={`dur_${duration.id}`}
                      checked={
                        !!storeFilters.duration.find(
                          (item: DurationFilter) => item.slug == duration.slug
                        )
                      }
                      onChange={(e) =>
                        setDurationFilter(
                          duration,
                          e.target.checked ? "add" : "delete"
                        )
                      }
                    />
                    <label
                      className="edu-check-label"
                      htmlFor={`dur_${duration.id}`}
                    >
                      {duration.name}
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StoreSideBar;
