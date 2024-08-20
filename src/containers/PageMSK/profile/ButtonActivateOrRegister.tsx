import { hasText } from 'logic/account'
import { FC } from 'react'
import { useHistory } from 'react-router-dom';

interface ButtonActivateOrRegisterProps {
    isDisabledActivate: boolean;
    handleActivateClick: () => void;
    whenActivate: boolean;
    status: string;
    productSlug: string | undefined;
}

const ButtonActivateOrRegister: FC<ButtonActivateOrRegisterProps> = ({ isDisabledActivate, handleActivateClick, whenActivate, status, productSlug }) => {
    const history = useHistory();
    return (
        <>
            {isDisabledActivate ?  <button
                className="course-network text-primary font-bold disabled:text-grey-disabled disabled:cursor-not-allowed disabled:opacity-70"
                onClick={() => history.push(`/curso/${productSlug}`)}
            >
                Inscríbete
            </button> : <button
                className="course-network text-primary font-bold disabled:text-grey-disabled disabled:cursor-not-allowed disabled:opacity-70"
                onClick={handleActivateClick}
                disabled={isDisabledActivate}
            >
                {whenActivate ? (
                    <div className="flex justify-center items-center">
                        Activando...
                    </div>
                ) : (
                    hasText(status)
                )}
            </button>
            }
        </>
    )
}

export default ButtonActivateOrRegister