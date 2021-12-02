import { ProjectModel } from "./proyecto.js";

const resolversProyecto = {
  Query: {
      Proyectos: async (parent, args) => {
        const proyectos = await ProjectModel.find().populate([
          { path: "lider" },
          { path: "avances" },
          { path: "inscripciones", populate: { path: "estudiante" } },
        ]);
        
        return proyectos;
      },
  },
  Mutation: {
    crearProyecto: async (parent, args) => {
      const proyectoCreado = await ProjectModel.create({
        nombre: args.nombre,
        estado: args.estado,
        fase: args.fase,
        fechaInicio: args.fechaInicio,
        fechaFin: args.fechaFin,
        presupuesto: args.presupuesto,
        lider: args.lider,
        objetivos: args.objetivos,
      });
      return proyectoCreado;
    },
    editarProyecto: async (parent, args) => {
      const proyectoEdit = await ProjectModel.findOneAndUpdate(
        args._id,
        { ...args.editProyecto },
        { new: true }
      );
      return proyectoEdit;
    },
  },
};

export { resolversProyecto };
