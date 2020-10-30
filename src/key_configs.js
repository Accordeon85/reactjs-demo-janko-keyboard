
export const keyShapes = {
  round : 'round',
  rectangle : 'rectangle',
  hexagon : 'hexagon'
}

export const keyConfigs = {
  roundKeyConfig : {
    width: 16,
    strokeS: 1,
    spacingH: 17,
    spacingV: 14,
    mainPaddingH: 15,
    mainPaddingV: 52,
    keyShape: keyShapes.round
  },
  rectKeyConfig : {
    width: 12,
    strokeS: 1,
    spacingH: 14,
    spacingV: 16,
    mainPaddingH: 15,
    mainPaddingV: 48,
    keyShape: keyShapes.rectangle
  },
  hexaKeyConfig : {
    width: 10,
    strokeS: 1,
    spacingH: 18,
    spacingV: 16,
    mainPaddingH: 16,
    mainPaddingV: 62,
    keyShape: keyShapes.hexagon
  }
}
