import { ProjectModel } from "./proyecto.js";

const resolversProyecto = {
  Query: {
    Proyectos: async (parent, args) => {
      const proyectos = await ProjectModel.find().populate([
        { path: "lider" },
        { path: "avances" },
        { path: "inscripciones", populate: { path: "estudiante" } },
      ]);

      console.log(proyectos);
      return proyectos;
    },
    proyectosLider: async (parent, args) => {
      //if (Object.keys(args).includes("lider")) {
      const proLid = await ProjectModel.find({
        lider: "618ff181059a50159fc507cb",
      }).populate([{ path: "lider" }]);
      console.log(proLid);
      return proLid;
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
        {
          nombre: args.nombre,
          presupuesto: args.presupuesto,
          fechaInicio: args.fechaInicio,
          fechaFin: args.fechaFin,
          estado: args.estado,
          fase: args.fase,
          //lider: args.lider,
          //objetivos: args.objetivos,
        },
        //{ ...args.editProyecto },
        { new: true }
      );
      return proyectoEdit;
    },
    // editProyecto: async (parent, args) => {
    //   const proyectoEdit = await ProjectModel.findByIdAndUpdate(
    //     args._id,
    //     { ...args.campos },
    //     { new: true }
    //   );
    //   return proyectoEdit;
    // },
    aprobarProyecto: async (parent, args) => {
      const listaProyectos = await ProjectModel.find({ rol: "ADMINISTRADOR" });
      return listaProyectos;
    },
  },
};

export { resolversProyecto };
