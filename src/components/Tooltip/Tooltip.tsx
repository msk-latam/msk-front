import React, { FC, useState } from 'react';

interface Props {
  text: string;
  className?: string;
  children: React.ReactNode;
}

const Tooltip: FC<Props> = ({ text, children, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <>
      {text && text.length && (
        <div
          className={`tooltip-container ${className}`}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {children}
          {isVisible && <div className='tooltip relative right-0'>{text}</div>}
          {isVisible && <div className='tooltip-arrow'></div>}
        </div>
      )}
    </>
  );
};

export default Tooltip;
