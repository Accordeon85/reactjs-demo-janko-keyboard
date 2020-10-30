import React from 'react';

const RectangleKey = (props) => {
  const { 
    mainPaddingH, 
    mainPaddingV, 
    spacingH,
    spacingV, 
    posX, 
    posY,
    isBlack,
    width,
    className,
    onClick
  } = props
  return <rect x={mainPaddingH+spacingH*posX} y={mainPaddingV+spacingV*posY}
   width={width} height={width*1.3} fill={isBlack ? 'black' : 'white'} stroke='black' className={className}
   onClick={onClick} />
}

export default RectangleKey