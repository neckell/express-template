export class DerechoDirecto {
  "regimen": number;
  "Años": number;
  "Meses": number;
  "dias": number;

  constructor(data: {
    regimen: number
    Años: number,
    Meses: number,
    dias: number
  }) {
    this.regimen = data.regimen;
    this.Años = data.Años;
    this.Meses = data.Meses;
    this.dias = data.dias;
  }
}