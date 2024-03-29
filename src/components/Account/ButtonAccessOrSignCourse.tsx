import { FC, useContext, useState } from 'react'
import ButtonAccessCourse from './ButtonAccessCourse'
import { UserCourseProgress } from 'data/types';
import { statusOrdenVenta } from 'logic/account';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import { useHistory } from 'react-router-dom';
import { CountryContext } from 'context/country/CountryContext';

interface ButtonAccessOrSignCourseProps {
    email: string;
    goToEnroll: (product_code: number, email: string) => Promise<any>;
    goToLMS: (
        product_code: number,
        cod_curso: string,
        email: string
    ) => Promise<void>;
    item: UserCourseProgress;
}

const ButtonAccessOrSignCourse: FC<ButtonAccessOrSignCourseProps> = ({ email, goToEnroll, goToLMS, item }) => {
    const statusOV = statusOrdenVenta(item?.ov);
    const [isDisabled, setIsDisabled] = useState(statusOV.isDisabled);
    const {state} = useContext(CountryContext);
    const history = useHistory()

    return (
        <>
            {isDisabled ? (<ButtonPrimary
                onClick={() => history.push(`/curso/${item.slug}`)}
                sizeClass="py-0.5 sm:py-1 px-2 sm:px-5"
            >
                <span className="text-[14px] sm:text-sm">Inscríbete</span>
            </ButtonPrimary>
            ) : (
                <ButtonAccessCourse
                    email={email}
                    goToEnroll={goToEnroll}
                    goToLMS={goToLMS}
                    item={item}
                />)}

        </>
    )
}

export default ButtonAccessOrSignCourse