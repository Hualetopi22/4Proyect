import { gql } from "apollo-server-express";

//rol: Enum_Rol!
//estado: Enum_EstadoUsuario
const tiposUsuario = gql`
  type Usuario {
    _id: ID
    nombre: String
    apellido: String
    correo: String
    identificacion: String
    password: String
    rol: String
    
  }
  type Query {
    Usuarios: [Usuario]
    Usuario(_id: String!): Usuario
    user: [Usuario]
    prueba: [Usuario]
  }
  type Mutation {
    crearUsuario(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      password: String!
      estado: Enum_EstadoUsuario
    ): Usuario
    editarUsuario(
      _id: String
      nombre: String
      apellido: String
      identificacion: String
      correo: String
      rol: Enum_Rol
      estado: Enum_EstadoUsuario
    ): Usuario
    eliminarUsuario(_id: String, correo: String): Usuario
  }
`;

export { tiposUsuario };
