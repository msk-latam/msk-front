import React, {Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import InputSkeleton from "@/components/Skeleton/InputSkeleton";
import Image from "next/image";
import rbImg from "/public/images/rebill.svg";
import TextSkeleton from "@/components/Skeleton/TextSkeleton";
import { getRebillInitialization, initRebill } from "@/logic/Rebill";
import { AuthContext } from "@/context/user/AuthContext";
import { FetchSingleProduct } from "@/data/types";

interface RebillCheckoutProps{
    product: FetchSingleProduct | undefined;
    hasCoursedRequested: boolean;
    country: string;
    showMissingData: boolean;
    setShow: Dispatch<SetStateAction<boolean>>;
    setFaliedMessage: Dispatch<SetStateAction<string>>;
    setPaymentCorrect: Dispatch<SetStateAction<boolean | null>>;
    mountedInputObjectState: {
        state: boolean;
        setState: Dispatch<SetStateAction<boolean>>
    }
}

const RebillCheckout: FC<RebillCheckoutProps> = ({
                                product,
                                hasCoursedRequested,
                                country,
                                showMissingData,
                                setShow,
                                setFaliedMessage,
                                setPaymentCorrect,
                                                     mountedInputObjectState
    }) =>{
    const [initedRebill, setInitedRebill] = useState<boolean | null>(null);
    const { state: AuthState, dispatch } = useContext(AuthContext);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (typeof window.Rebill !== "undefined") {
                const initialization = getRebillInitialization(country);

                console.log({ initialization });

                let RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

                const verifiedCoursedRequested = hasCoursedRequested != null && !hasCoursedRequested;
                const verifiedProductAndProfile =
                    typeof product !== "undefined" &&
                    AuthState.profile != null &&
                    Object.keys(AuthState.profile).length > 1;

                if (
                    initedRebill == null &&
                    verifiedCoursedRequested &&
                    verifiedProductAndProfile &&
                    !showMissingData
                ) {
                    setInitedRebill(true);
                    console.group("Rebill");
                    localStorage.removeItem("trialURL");
                    //console.log({user: AuthState, country, product, RebillSDKCheckout, setShow, setFaliedMessage, setPaymentCorrect, setMountedInput})
                    initRebill(
                        AuthState,
                        country,
                        product,
                        RebillSDKCheckout,
                        setShow,
                        setFaliedMessage,
                        setPaymentCorrect,
                        mountedInputObjectState.setState
                    );
                    console.groupEnd();
                }
            }
        }
    }, [product, hasCoursedRequested, AuthState.profile]);

    return (
        <>
            <div
                id="rebill_elements"
                className="flex items-center justify-center h-auto"
            >
                {mountedInputObjectState.state && <InputSkeleton className="w-[390px]" />}
            </div>

            {mountedInputObjectState.state ? (
                <div className="text-violet-wash flex items-center justify-center gap-x-3 mb-4">
                    <span>Pagos procesados con</span>

                    <Image
                        src={rbImg.src}
                        width={70}
                        height={80}
                        alt={"Rebill Image"}
                    />
                </div>
            ) : (
                <TextSkeleton className="flex justify-center mx-auto" />
            )}
        </>)
}

export default RebillCheckout;