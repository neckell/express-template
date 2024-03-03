export class DerechoHijos {
  hijosTutela: number
  hijosDiscapacidad: number
  hijosAdopcion: number
  hijosAUH: number

  constructor(data: {
    hijosTutela: number
    hijosDiscapacidad: number
    hijosAdopcion: number
    hijosAUH: number
  }) {
    this.hijosTutela = data.hijosTutela
    this.hijosDiscapacidad = data.hijosDiscapacidad
    this.hijosAdopcion = data.hijosAdopcion
    this.hijosAUH = data.hijosAUH
  }
}