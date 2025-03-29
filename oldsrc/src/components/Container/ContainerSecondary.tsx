import { FC, ReactNode } from 'react'
import { parseHtml } from 'utils/parseHTML'

interface ContainerSecondaryProps{
  contentAttribute:{texto_1: string; texto_2: string;} | null
  children?: ReactNode| null
}

const ContainerSecondary:FC<ContainerSecondaryProps> = ({contentAttribute, children= null}) => {
  return (
    <div className='bg-[#F3F4F6] mt-8 p-4 py-16 md:container text-center rounded-[40px] mb-[96px]'>                
        <h2 className='text-[36px] my-3 font-normal' dangerouslySetInnerHTML={{__html: parseHtml(contentAttribute?.texto_1 as string, true)}}/>
        <p className='text-[20px] text-violet-wash' dangerouslySetInnerHTML={{__html: parseHtml(contentAttribute?.texto_2 as string, true)}}/>
        {children}
    </div>
  )
}

export default ContainerSecondary