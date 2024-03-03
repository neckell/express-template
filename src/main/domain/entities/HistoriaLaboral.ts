export class HistoriaLaboral {
  cuit: string;
  caja: string;
  empleador: string;
  periodo_cese: string;
  periodo_inicio: string;
  regimen: string;

  constructor(data: {
    cuit: string
    caja: string,
    empleador: string,
    periodo_cese: string
    periodo_inicio: string
    regimen: string
  }) {
    this.cuit = data.cuit;
    this.caja = data.caja;
    this.empleador = data.empleador;
    this.periodo_cese = data.periodo_cese;
    this.periodo_inicio = data.periodo_inicio;
    this.regimen = data.regimen;
  }
}