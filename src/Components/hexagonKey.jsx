import React from 'react';

const HexagonKey = (props) => {
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

  const centerX = mainPaddingH+spacingH*posX
  const centerY = mainPaddingV+spacingV*posY
  const pX = centerX+width*0.87
  const p1 = { x:centerX-width*0.87, y:centerY-width/2 }
  const p2 = { x:centerX, y:centerY-width }
  const p3 = { x:pX, y:centerY-width/2 }
  const p4 = { x:pX, y:centerY+width/2 }
  const p5 = { x:centerX, y:centerY+width }
  const p6 = { x:p1.x, y:centerY+width/2 }

  return <>
    <polygon points={`${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} 
      ${p4.x},${p4.y} ${p5.x},${p5.y} ${p6.x},${p6.y}` }
      fill={isBlack ? 'black' : 'white'} stroke='black' className={className}
      onClick={onClick} />
    </>
}

export default HexagonKey