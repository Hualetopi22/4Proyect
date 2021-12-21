import { UserModel } from "./usuario.js";
//const db = client.db(DB_NAME);

const resolversUsuario = {
  Query: {
    Usuarios: async (parent, args) => {
      console.log("EJECUTANCDO CONSULTA DE USUARIOS", parent);
      const usuarios = await UserModel.find({ ...args.filtro });
      return usuarios;
    },
    Usuario: async (parent, args) => {
      const usuario = await UserModel.findOne({ _id: args._id });
      console.log(usuario);
      return usuario;
    },
    user: async (parent, args) => {
      return await console.log("parent", parent);
    },
    prueba: async (parent, args) => {
      return await UserModel.find();
    },
    //Como lider consulta listado de estudiantes
    estudiantes: async (parent, args) => {
      const estudiantel = await UserModel.find({ rol: "ESTUDIANTE" });
      return estudiantel;
    },
  },
  Mutation: {
    crearUsuario: async (parent, args) => {
      const usuarioCreado = await UserModel.create({
        nombre: args.nombre,
        apellido: args.apellido,
        identificacion: args.identificacion,
        correo: args.correo,
        password: args.password,
        rol: args.rol,
      });

      if (Object.keys(args).includes("estado")) {
        usuarioCreado.estado = args.estado;
      }

      return usuarioCreado;
    },
    editarUsuario: async (parent, args) => {
      const usuarioEditado = await UserModel.findByIdAndUpdate(
        args._id,
        {
          nombre: args.nombre,
          apellido: args.apellido,
          identificacion: args.identificacion,
          correo: args.correo,
          rol: args.rol,
          estado: args.estado,
        },
        { new: true }
      );

      return usuarioEditado;
    },
    eliminarUsuario: async (parent, args) => {
      if (Object.keys(args).includes("_id")) {
        const usuarioEliminado = await UserModel.findOneAndDelete({
          _id: args._id,
        });
        return usuarioEliminado;
      } else if (Object.keys(args).includes("correo")) {
        const usuarioEliminado = await UserModel.findOneAndDelete({
          correo: args.correo,
        });
        return usuarioEliminado;
      }
    },
  },
};

export { resolversUsuario };
