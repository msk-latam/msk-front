import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ssr from '@/services/ssr';

interface TrialCoursesStatus {
  hasCoursedRequested: boolean;
  showMissingData: boolean;
  setShowMissingData: Dispatch<SetStateAction<boolean>>;
  showAlreadyRequest: boolean;
  setShowAlreadyRequest: Dispatch<SetStateAction<boolean>>;
}

const useRequestedTrialCourse = (product?: any): TrialCoursesStatus => {
  const [hasCoursedRequested, setHasCoursedRequested] = useState(false);
  const [showAlreadyRequest, setShowAlreadyRequest] = useState(false);
  const [showMissingData, setShowMissingData] = useState(false);
  //const { state: AuthState } = useContext(AuthContext);

  useEffect(() => {
    const checkTrialCourses = async () => {
      const userProfile: any = await ssr.getUserData();
      // console.log({ userProfile });

      const hasTrialCourses = userProfile?.trial_course_sites;

      if (
        !(userProfile?.contact.type_doc || userProfile?.contact.identification)
      ) {
        setShowMissingData(true);
      }

      if (
        hasTrialCourses &&
        hasTrialCourses.length > 0 &&
        typeof product !== 'undefined'
      ) {
        hasTrialCourses.forEach((tc: any) => {
          let contract = JSON.parse(tc.contractJson);
          let productWpCode =
            product?.ficha?.product_code ?? product.product_code;

          let [isMatch] = contract.data[0].Product_Details.map((pd: any) => {
            return Number(pd.product.Product_Code) === productWpCode;
          });

          //console.log({contract, isMatch,productWpCode,product})

          if (isMatch) {
            setHasCoursedRequested(isMatch);
            setShowAlreadyRequest(isMatch);
            return;
          } else {
            setHasCoursedRequested(isMatch);
          }
        });
      } else if (
        typeof userProfile !== 'undefined' &&
        Object.keys(userProfile ?? {}).length > 1
      ) {
        setHasCoursedRequested(false);
      }

      //console.log({hasTrialCourses, product, userProfile})
    };

    checkTrialCourses();
  }, [product]);

  return {
    hasCoursedRequested,
    showAlreadyRequest,
    showMissingData,
    setShowMissingData,
    setShowAlreadyRequest,
  };
};

export default useRequestedTrialCourse;
