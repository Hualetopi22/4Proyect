import { resolversAvance } from "../models/avance/resolvers.js";
import { resolversUsuario} from "../models/usuario/resolvers.js";
import { resolversProyecto } from "../models/proyecto/resolvers.js";


export const resolvers = [resolversAvance, resolversUsuario, resolversProyecto];
