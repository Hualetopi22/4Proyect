import { ModeloAvance } from "./avance.js";

const resolversAvance = {
  Query: {
    Avances: async (parent, args) => {
      const avances = await ModeloAvance.find().populate([
        { path: "proyecto", populate: { path: "estudiante" } },
        { path: "creadoPor" },
      ]);
      console.log(avances);
      return avances;
    },
    filtrarAvance: async (parents, args) => {
      const avanceFiltrado = await ModeloAvance.find({
        proyecto: args._id,
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
    editarAvance: async (parent, args) => {
      const avanceEdit = await ModeloAvance.findByIdAndUpdate(
        args._id,
        {
          fecha: args.fecha,
          descripcion: args.descripcion,
          proyecto: args.proyecto,
          creadoPor: args.creadoPor,
        },
        { new: true }
      );
      return avanceEdit;
    },
    // observacionAvance: async (parent, args) => {
    //   const agregarObservacion = args.observacion;
    //   const avanceObjetivos = await ModeloAvance.findByIdAndUpdate(
    //     args._idAvance,
    //     {
    //       $addToSet: {
    //         observaciones: agregarObservacion,
    //       },
    //     },
    //     { new: true }
    //   );
    //   return avanceObjetivos;
    // },
  },
};

export { resolversAvance };
