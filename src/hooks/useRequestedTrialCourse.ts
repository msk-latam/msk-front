import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from '@/context/user/AuthContext';

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
  const { state: AuthState } = useContext(AuthContext);

  useEffect(() => {
    const checkTrialCourses = async () => {
      const userProfile: any = AuthState.profile;
      const hasTrialCourses = userProfile?.trial_course_sites;

      console.log({ userProfile });

      /*  if (!(userProfile?.type_doc || userProfile?.identification)) {
        setShowMissingData(true);
      } */

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
        Object.keys(userProfile).length > 1
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
