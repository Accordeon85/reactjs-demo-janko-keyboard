import React from 'react';

const RoundKey = (props) => {
  const { 
    mainPaddingH, 
    mainPaddingV, 
    spacingH,
    spacingV,
    posX,
    posY,
    isBlack,
    ray,
    className,
    onClick
  } = props
  return <circle cx={mainPaddingH+spacingH*posX} cy={mainPaddingV+spacingV*posY}
   r={ray} fill={isBlack ? 'black' : 'white'} stroke='black' className={className} onClick={onClick} />
}

export default RoundKey