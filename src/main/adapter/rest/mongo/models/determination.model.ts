import { mongoose, Schema } from "../common/loader.js";
import { MongoAdapter } from "../common/adapter.js";
import { UserDeterminationCalculationRequest } from "../../../../domain/entities/core.js";
import { DateTime } from "../../../../domain/entities/DateTime.js";
import { Status } from "../../../../domain/entities/Status.js";

const modelName = 'Determination';

const HistoriaLaboralSchema: Schema = new Schema({
  cuit: { type: String },
  caja: { type: String, required: true },
  empleador: { type: String },
  periodo_cese: { type: String, required: true },
  periodo_inicio: { type: String, required: true },
  regimen: { type: Number, required: true }
});

const DerechoDirectoSchema: Schema = new Schema({
  "regimen": { type: Number, required: true },
  "Años": { type: Number, required: true },
  "Meses": { type: Number, required: true },
  "dias": { type: Number, required: true },
});

const DerechoHijosSchema: Schema = new Schema({
  hijosTutela: { type: Number, required: true },
  hijosDiscapacidad: { type: Number, required: true },
  hijosAdopcion: { type: Number, required: true },
  hijosAUH: { type: Number, required: true },
});


export interface Determination extends UserDeterminationCalculationRequest, DateTime {
  status: Number
  statusMessage?: string
}

const schema: Schema<Determination> = new Schema({
  apellido: { type: String, required: true },
  sexo: { type: String, required: true },
  cuit: { type: String, required: true },
  fecha_nacimiento: { type: String, required: true },
  fecha_calculo: { type: String, required: true },
  fecha_cierre_computo: { type: String, required: true },
  regimen_aportes: { type: Number, required: true },
  historia_laboral: { type: [HistoriaLaboralSchema], required: true },
  derecho_directo: { type: [DerechoDirectoSchema] },
  derecho_hijos: { type: DerechoHijosSchema },
  status: { type: Number, enum: Status, default: Status.Created },
  statusMessage: { type: String },
  createdAt: { type: Date, default: new Date(), immutable: true },
  updatedAt: { type: Date, default: new Date() }
});

export default new MongoAdapter<Determination>
  (mongoose.model<Determination>(modelName, schema));