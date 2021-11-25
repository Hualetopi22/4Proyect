
import { gql } from "apollo-server-express";

const tipoAutenticacion = gql `
type Token {
    token: String
    error: String
},
type Mutation {
    registro(
      nombre: String!
      apellido: String!
      identificacion: String!
      correo: String!
      rol: Enum_Rol!
      estado: Enum_EstadoUsuario
      contraseña: String!
    ): Token!

    login(
      correo: String!
      password: String!
    ):Token
}

`;

export { tipoAutenticacion };