import { ModeloAvance } from "./avance.js";

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find()
        .populate("proyecto")
        .populate("creadoPor");
        console.log(avances);
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({
        proyecto: args._id
      })
        .populate("proyecto")
        .populate("creadoPor");
      return avanceFiltrado;
    },
  },
  Mutation: {
    //para el estudiante
    crearAvance: async (parent, args) => {
      const avanceCreado = ModeloAvance.create({
        fecha: args.fecha,
        descripcion: args.descripcion,
        proyecto: args.proyecto,
        creadoPor: args.creadoPor,
      });
      return avanceCreado;
    },
  },
};

export { resolversAvance };
