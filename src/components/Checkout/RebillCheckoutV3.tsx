import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import rbImg from '/public/images/rebill.svg';
import TextSkeleton from '@/components/Skeleton/TextSkeleton';
import { AuthContext } from '@/context/user/AuthContext';
import { FetchSingleProduct } from '@/data/types';
import { initRebillV3 } from '@/logic/RebillV3';
import { useAuth } from '@/hooks/useAuth';

interface RebillCheckoutV3Props {
  product: FetchSingleProduct | undefined;
  hasCoursedRequested: boolean;
  country: string;
  showMissingData: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  setFaliedMessage: Dispatch<SetStateAction<string>>;
  setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>;
  mountedInputObjectState: {
    state: boolean;
    setState: Dispatch<SetStateAction<boolean>>;
  };
}

const RebillCheckoutV3: FC<RebillCheckoutV3Props> = ({
  product,
  hasCoursedRequested,
  country,
  showMissingData,
  setShow,
  setFaliedMessage,
  setPaymentCorrect,
  mountedInputObjectState,
}) => {
  const [initedRebill, setInitedRebill] = useState<boolean | null>(null);
  const { profile, email } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log('WINDOW', { window }, window.Rebill);
      if (typeof window.Rebill !== 'undefined') {
        const verifiedCoursedRequested =
          hasCoursedRequested != null && !hasCoursedRequested;
        const verifiedProductAndProfile =
          typeof product !== 'undefined' &&
          profile != null &&
          Object.keys(profile).length > 1;

        if (
          initedRebill == null &&
          verifiedCoursedRequested &&
          verifiedProductAndProfile &&
          !showMissingData
        ) {
          setInitedRebill(true);
          console.group('RebillV3');
          localStorage.removeItem('trialURL');
          console.log({ user: profile });

          try {
            initRebillV3(
              email,
              country,
              product,
              setShow,
              setFaliedMessage,
              setPaymentCorrect,
            );
            mountedInputObjectState.setState(true);
          } catch (err) {
            console.log(err);
            mountedInputObjectState.setState(false);
          }

          console.groupEnd();
        }
      }
    }
  }, [product, hasCoursedRequested, profile]);

  return (
    <>
      <div id='rebill' className='flex items-center justify-center h-auto'>
        {/*  {mountedInputObjectState.state && (
          <InputSkeleton className='w-[390px]' />
        )} */}
      </div>

      {mountedInputObjectState.state ? (
        <div className='text-violet-wash flex items-center justify-center gap-x-3 mb-4'>
          <span>Pagos procesados con</span>

          <Image src={rbImg.src} width={70} height={80} alt={'Rebill Image'} />
        </div>
      ) : (
        <TextSkeleton className='flex justify-center mx-auto' />
      )}
    </>
  );
};

export default RebillCheckoutV3;
