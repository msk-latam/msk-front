import NcLink from 'components/NcLink/NcLink';
import { FC, ReactNode } from 'react'

interface ButtonPageProps{
    tracking: boolean;
    page: number;
    urlTrack: string;
    icon?: ReactNode
}

const ButtonPage: FC<ButtonPageProps> = ({tracking, page, urlTrack, icon}) => {
    const hasSearch = window.location.search !== "" 
    const prevSearchUrl = hasSearch ? window.location.search : urlTrack
    const redirect = tracking ? `${prevSearchUrl.replace(/([?&])page=\d+/, "")}${hasSearch ? `&page=${page}` : `page=${page}`}` : ""
    const content = icon ?? (page < 10 ? `0${page}` : page)

    console.log(hasSearch, prevSearchUrl, redirect)
  return (
    <>
    {
      tracking ? (<NcLink
        to={redirect}
        colorClass=""
      >
        {content}
      </NcLink> ) : (<button className="nc-NcLink hover:text-primary-800"> {content}</button>)
    }
    </>
    
  )
}

export default ButtonPage