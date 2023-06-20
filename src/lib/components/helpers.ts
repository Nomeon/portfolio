Number.prototype.clamp = function(this: number, min: number, max: number): number { return Math.min(Math.max(this, min), max) }

export function mobileCheck(){
  if (typeof navigator !== 'undefined') {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600
  }
  return null
}
export const sample = (items: string | any[]) => items[Math.floor(Math.random()*items.length)]

export function rn(start: number,end: number) {
  if (start == null) start = 0
  if (end == null) end = 1
  return start + (Math.random() * (end - start))
}

export function ri(start: number,end: number) {
  if (start == null) start = 0
  if (end == null) end = 1
  return Math.floor(start + (Math.random() * ((end - start) + 1)))
}

export const q = (sel: string) => document.querySelector(sel)

export const color2Hex = (color: number) => {
  if (typeof color == 'number'){
    return '#' +  ('00000' + color.toString(16)).slice(-6)
  } else return color
}

export const color2Rgb = (color: number, alpha=1) => {
  const hex = color2Hex(color)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  const obj = result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null
  return obj === null ? 'rgba(0, 0, 0, ' + alpha + ')' : 'rgba('+ obj.r +','+ obj.g +','+ obj.b +','+ alpha +')'
}

export const getBrightness = (threeColor: THREE.Color) => {
  return (0.299 * threeColor.r) + (0.587 * threeColor.g) + (0.114 * threeColor.b);
}

export function clearThree(obj: { children: string | any[]; remove: (arg0: any) => void; geometry: { dispose: () => void }; material: { [x: string]: { dispose: () => void }; dispose?: any } }) {
  while (obj.children && obj.children.length > 0) {
    clearThree(obj.children[0])
    obj.remove(obj.children[0])
  }
  if (obj.geometry) obj.geometry.dispose()
  if (obj.material) {
    Object.keys(obj.material).forEach(prop => {
      if (!obj.material[prop]) return
      if (obj.material[prop] !== null && typeof obj.material[prop].dispose === 'function') {
        obj.material[prop].dispose()
      }
    })
    obj.material.dispose()
  }
}