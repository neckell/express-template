interface HistoriaResponseDto {
  "cuit": string;
  "caja": string;
  "empleador": string;
  "periodo_cese": string;
  "periodo_inicio": string;
  "regimen": string;
}

interface DeudaResponseDto {
  Actual: string;
  "Aportes.1": number;
  "Aportes.2": number;
  Aportes1: number;
  "Benef.  Aplic.": number | null;
  Desde: string;
  Fonavi: number;
  "Fonavi.1": number;
  "Fonavi.2": number;
  Hasta: string;
  Histórica: string;
  INSSJP: number;
  "INSSJP.1": number;
  "INSSJP.2": number;
  Subtotal: number;
  "Subtotal.1": number;
  Total: number;
  "Unnamed: 17": number | null;
  id: number;
}

export interface UserDeterminationImportResponseDto {
  cuit: string;
  apellido: string;
  deuda: DeudaResponseDto[];
  historia: HistoriaResponseDto[];
  historia_laboral?: HistoriaResponseDto[];
  sicam?: HistoriaResponseDto[];
}