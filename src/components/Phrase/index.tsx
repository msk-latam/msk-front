import React, { FC } from 'react'
import { parseHtml } from 'utils/parseHTML'

const Phrase: FC<{content: string}> = ({content}) => {
  return (
    <div className='font-lora-italic p-4 border border-[#EBEFF4] rounded-lg text-center mb-[96px] text-[#8D929E]' dangerouslySetInnerHTML={{__html: parseHtml(content, true)}} />
  )
}

export default Phrase