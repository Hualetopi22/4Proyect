import mongoose from "mongoose";
import { ProjectModel } from "../proyecto/proyecto.js";
import { UserModel } from "../usuario/usuario.js";

const { Schema, model } = mongoose;

const inscripcionSchema = new Schema({
  fechaIngreso: {
    type: Date,
    required: false,
  },
  fechaEgreso: {
    type: Date,
    required: false,
  },
  estado: {
    type: String,
    enum: ["ACEPTADO", "RECHAZADO", "PENDIENTE"],
    default: "PENDIENTE",
    required: false,
  },
  proyecto: {
    type: Schema.Types.ObjectId,
    ref: ProjectModel,
    required: false,
  },
  estudiante: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
});

const InscriptionModel = model("Inscripcion", inscripcionSchema, "inscripcion");

export { InscriptionModel };
