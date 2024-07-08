import { useState, useEffect } from "react";
import api from "@/services/api";

export interface SpecialitiePost {
  speciality_name: string;
  image: string;
  articles: number;
  url_query?: string;
}

const useSpecialitiesPosts = () => {
  const [allSpecialtiesGroups, setAllSpecialtiesGroup] = useState<
    SpecialitiePost[]
  >([]);
  const [fiveSpecialtiesGroups, setFiveSpecialtiesGroup] = useState<
    SpecialitiePost[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchPostsSpecialities = async () => {
    const res = await api.getNotesSpecialities();
    setAllSpecialtiesGroup(res?.specialities);
    setFiveSpecialtiesGroup(res?.specialities.slice(0, 5));
    setLoading(false);
  };

  useEffect(() => {
    fetchPostsSpecialities();
  }, []);

  return { fiveSpecialtiesGroups, allSpecialtiesGroups, loading };
};

export default useSpecialitiesPosts;
