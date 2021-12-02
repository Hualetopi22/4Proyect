import { resolversAvance } from "../models/avance/resolvers.js";
import { resolversUsuario} from "../models/usuario/resolvers.js";
import { resolversProyecto } from "../models/proyecto/resolvers.js";
import { resolversInscripciones } from "../models/inscripcion/resolvers.js";
import { resolverAutenticacion } from "./auth/resolvers.js";


export const resolvers = [resolversAvance, resolversUsuario, resolversProyecto, resolversInscripciones, resolverAutenticacion];
