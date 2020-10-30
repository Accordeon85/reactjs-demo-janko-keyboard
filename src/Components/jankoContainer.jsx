import React, { useState, useEffect } from 'react'
import RoundKey from './roundKey'
import RectangleKey from './rectangleKey'
import HexagonKey from './hexagonKey'
import { keyShapes } from '../key_configs'

const JankoStructure = (arr, octave, doubles) => {
  let fullArr = []
  for(let i = 0; i <= doubles;i++) {
    fullArr = [].concat(fullArr, arr.map((elm, j) => { 
      return { 
      note: elm + parseInt(octave+1),
      posX: (j/2) + octave*6,
      posY: j%2 !==0 ? -(2*i+1) : -i*2,
      isBlack: elm.includes('s')
      }
    }))
  }
  return fullArr
}

const JankoContainer = (props) => {
  const { mainPaddingH, mainPaddingV, spacingH, spacingV, width, keyShape, doubles, onKeyClick } = props
  const octaves = Array.from({length: props.nbOctaves}, (v, i) => i)
  const jankoNotes = [].concat(...octaves.map(o => JankoStructure(props.notes,o, doubles)))
  let [keyboardSize, updatekeyboardSize] = useState(window.innerWidth/3.5)

  console.log(window.innerHeight)
  console.log(window.innerWidth)

  const getKeyBoard = () => {
    if (keyShape === keyShapes.round) {
      return <>
        {
          jankoNotes.map((n,i) =>
            <RoundKey mainPaddingH={mainPaddingH} mainPaddingV={mainPaddingV+(doubles*14)}
              spacingH={spacingH}
              posX={n.posX}
              spacingV={spacingV}
              posY={n.posY}
              ray={width/2}
              isBlack={n.isBlack}
              key={i}
              className={`key-${n.note}`}
              onClick={() => onKeyClick(n.note)} />
          )
        }
      </>
    }
    if (keyShape === keyShapes.hexagon) {
      return <>
        {
          jankoNotes.map((n,i) =>
            <HexagonKey mainPaddingH={mainPaddingH} mainPaddingV={mainPaddingV+(doubles*15)}
              spacingH={spacingH}
              posX={n.posX}
              spacingV={spacingV}
              posY={n.posY}
              width={width}
              isBlack={n.isBlack}
              key={i}
              className={`key-${n.note}`}
              onClick={() => onKeyClick(n.note)}  />
          )
        }
      </>
    }
    return <>
    {
      jankoNotes.map((n,i) =>
        <RectangleKey mainPaddingH={mainPaddingH} mainPaddingV={mainPaddingV+(doubles*18)}
          spacingH={spacingH}
          posX={n.posX}
          spacingV={spacingV}
          posY={n.posY}
          width={width}
          isBlack={n.isBlack}
          key={i}
          className={`key-${n.note}`}
          onClick={() => onKeyClick(n.note)}  />
      )
    }
    </>
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      updatekeyboardSize(window.innerWidth/3.5)
    });
  }, []);

  return (
    <div className='svg-container'>
      <svg width="100%" height={keyboardSize} viewBox="100 0 150 150" >
      {
        getKeyBoard()
      }
      </svg>
    </div>
  )
}

export default JankoContainer