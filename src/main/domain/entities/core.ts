import { convertDate, dateToPythonDate, pythonDateToDate } from "../../utils/mutators.js";
import { isNullOrEmpty } from "../../utils/valitations/validations.js";
import { DerechoDirecto } from "./DerechoDirecto.js";
import { DerechoHijos } from "./DerechoHijos.js";
import { HistoriaLaboral } from "./HistoriaLaboral.js";
import { UserDeterminationImportResponseDto } from "./dto.js";

export interface DeudaAportes {
  "id": number;
  "Actual": string;
  "Aportes.1": number;
  "Aportes.2": number;
  "Aportes1": number;
  // "Benef.  Aplic.": number | null;
  "Desde": string;
  "Fonavi": number;
  "Fonavi.1": number;
  "Fonavi.2": number;
  "Hasta": string;
  "Histórica": string;
  "INSSJP": number;
  "INSSJP.1": number;
  "INSSJP.2": number;
  "Subtotal": number;
  "Subtotal.1": number;
  "Total": number;
  // "Unnamed: 17": any | null;
}

export interface Regimen {
  ID: number
  aportesh: number
  aportesm: number
  buscador: string
  codigo_raro: number | null
  codigo_sica: number
  detalle: any
  edadh: number
  edadm: number
  etiquetas: any
  ley: any
  nombre: string
  prioridad: number
}

export class UserDeterminationImportRequest {
  cuit: string;
  apellido: string;
  historia_laboral_file: Express.Multer.File;
  sicam_file: Express.Multer.File
  historia_laboral: HistoriaLaboral[];
  sicam: HistoriaLaboral[];

  constructor(data: {
    cuit: string
    apellido: string,
    historia_laboral: HistoriaLaboral[], sicam: HistoriaLaboral[]
    historia_laboral_file: Express.Multer.File, sicam_file: Express.Multer.File
  }) {
    this.cuit = data.cuit;
    this.apellido = data.apellido;
    this.historia_laboral = data.historia_laboral;
    this.sicam = data.sicam;
    this.historia_laboral_file = data.historia_laboral_file;
    this.sicam_file = data.sicam_file;
  }

  fixDatesForPython = () => {
    this.historia_laboral?.forEach((historia: HistoriaLaboral) => {
      historia.periodo_inicio = dateToPythonDate(historia.periodo_inicio)
      historia.periodo_cese = dateToPythonDate(historia.periodo_cese)
    })
    this.sicam?.forEach((historia: HistoriaLaboral) => {
      historia.periodo_inicio = dateToPythonDate(historia.periodo_inicio)
      historia.periodo_cese = dateToPythonDate(historia.periodo_cese)
    })
  }
}

export class UserDeterminationImport {
  cuit: string = '';
  apellido: string = '';
  deuda: DeudaAportes[] = [];
  historia: HistoriaLaboral[] = [];
  historia_laboral?: HistoriaLaboral[];
  sicam?: HistoriaLaboral[];

  constructor(data: UserDeterminationImportResponseDto) {
    if (!data) return;
    this.cuit = data.cuit;
    this.apellido = data.apellido;
    this.deuda = data.deuda;
    this.sicam = data.sicam?.map(this.HistoriaLaboralMapper);
    this.historia_laboral = data.historia_laboral?.map(this.HistoriaLaboralMapper);
    this.historia = data.historia?.map(this.HistoriaLaboralMapper);
  }

  HistoriaLaboralMapper = (item: { [x: string]: any; }) => ({
    cuit: item["cuit"],
    caja: item["caja"],
    empleador: item["empleador"],
    periodo_cese: item["periodo_cese"],
    periodo_inicio: item["periodo_inicio"],
    regimen: item["regimen"],
  })

  fixDatesFromPython = () => {
    this.historia?.forEach((historia: HistoriaLaboral) => {
      historia.periodo_inicio = pythonDateToDate(historia.periodo_inicio)
      historia.periodo_cese = pythonDateToDate(historia.periodo_cese)
    })
    this.historia_laboral
      ?.forEach((historia: HistoriaLaboral) => {
        historia.periodo_inicio = pythonDateToDate(historia.periodo_inicio)
        historia.periodo_cese = pythonDateToDate(historia.periodo_cese)
      })
    this.apellido = this.apellido ? this.apellido.trim() : ''
  }

  fixOrderHistoriaLaboral = () => {
    this.historia = this.historia?.sort((a: HistoriaLaboral, b: HistoriaLaboral) =>
      new Date(a.periodo_inicio).getTime() - new Date(b.periodo_inicio).getTime()
    )
  }
}

export class UserDeterminationCalculationRequest {
  apellido: string;
  sexo: string;
  cuit: string;
  fecha_nacimiento: string;
  fecha_solicitud: string;
  fecha_calculo: string
  fecha_cierre_computo: string;
  regimen_aportes: number;
  historia_laboral: HistoriaLaboral[]
  derecho_directo?: DerechoDirecto[]
  derecho_hijos?: DerechoHijos

  constructor(body: any) {
    this.apellido = body.apellido
    this.sexo = body.sexo
    this.cuit = body.cuit
    this.fecha_nacimiento = body.fecha_nacimiento
    this.fecha_solicitud = body.fecha_solicitud
    this.fecha_calculo = body.fecha_calculo
    this.fecha_cierre_computo = body.fecha_cierre_computo
    this.regimen_aportes = body.regimen_aportes
    this.historia_laboral = body.historia_laboral
    this.derecho_directo = body.derecho_directo
    this.derecho_hijos = isNullOrEmpty(body.derecho_hijos) ? undefined : body.derecho_hijos
  }

  sanitize = () => {
    this.fixDatesForPython()
    this.fixHijosDerechoDirecto();
    this.fixDerechoDirecto();
    this.fixHistoriaLaboral();
  }

  fixDatesForPython = () => {
    this.historia_laboral?.forEach((historia: HistoriaLaboral) => {
      historia.periodo_inicio = dateToPythonDate(historia.periodo_inicio)
      historia.periodo_cese = dateToPythonDate(historia.periodo_cese)
    })
    this.fecha_nacimiento = convertDate(this.fecha_nacimiento)
    this.fecha_solicitud = convertDate(this.fecha_solicitud)
    this.fecha_calculo = convertDate(this.fecha_calculo)
    this.fecha_cierre_computo = convertDate(this.fecha_cierre_computo)
  }

  fixHijosDerechoDirecto = () => {
    if (this.sexo !== "M") return
    const count = ((this.derecho_hijos !== undefined && this.derecho_hijos.hijosTutela !== undefined) ? this.derecho_hijos?.hijosTutela : 0)
      + ((this.derecho_hijos !== undefined && this.derecho_hijos.hijosDiscapacidad !== undefined) ? this.derecho_hijos?.hijosDiscapacidad : 0)
      + ((this.derecho_hijos !== undefined && this.derecho_hijos.hijosAdopcion !== undefined) ? this.derecho_hijos?.hijosAdopcion : 0)
      + ((this.derecho_hijos !== undefined && this.derecho_hijos.hijosAUH !== undefined) ? this.derecho_hijos?.hijosAUH : 0);
    if (count === 0) return
    const derechoDirectoHijos: DerechoDirecto =
    {
      "Años": count,
      regimen: 1,
      Meses: 0,
      dias: 0
    }
    if (isNullOrEmpty(this.derecho_directo))
      this.derecho_directo = new Array(derechoDirectoHijos)
    else
      this.derecho_directo?.push(derechoDirectoHijos)
  }

  fixDerechoDirecto = () => {
    if (Array.isArray(this.derecho_directo) && this.derecho_directo.length === 0)
      delete this.derecho_directo
    else if (this.derecho_directo)
      this.derecho_directo = this?.derecho_directo.map(d => ({ regimen: d.regimen, Años: d.Años, Meses: d.Meses, dias: d.dias }))
  }

  fixHistoriaLaboral = () => {
    if (Array.isArray(this.historia_laboral) && this.historia_laboral.length === 0)
      this.historia_laboral = undefined as any
  }
}