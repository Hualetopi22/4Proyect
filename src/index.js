//const { ApolloServer, gql } = require("apollo-server");
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import dotenv from "dotenv";
//const dotenv = require("dotenv");
import { MongoClient } from "mongodb";
//const { MongoClient } = require("mongodb");
//import { DB_URI, DB_NAME} from process.env
const { DB_URI, DB_NAME } = process.env;
import bycrypt from "bcryptjs";
//const bycrypt = require("bcryptjs");
import mongoose from "mongoose";
//const { mongoose } = require("mongoose");
const { Schema, model } = mongoose;
import conectarBD from "../db/db.js";
import { tipos } from "../graphql/types.js";
import { resolvers } from "../graphql/resolvers.js";


dotenv.config();

const server = new ApolloServer({
  typeDefs: tipos,
  resolvers: resolvers,
});

const start = async () => {
  const client = new MongoClient(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(DB_NAME);

  const context = {
    db,
  };

  const server = new ApolloServer({ typeDefs, resolvers, context });

  //the listen method launches a web server
  server.listen().then(({ url }) => {
    console.log(` Server ready at ${url}`);
  });
};

start();


// /*
// const userSchema = new Schema({
//   correo: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   identificacion: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   nombre: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   rol: {
//     type: String,
//     enum: ['PENDIENTE', 'AUTORIZADO', 'NO AUTORIZADO'],
//     default: 'PENDIENTE',
//   },
// });*/

// /*const UserModel = model("User", userSchema);*/
// /*
// const typeDefs = gql`
//   type Query {
//     misProyectos: [proyecto!]!
//   }

//   type Query {
//     Usuarios: [user!]!
//     Usuario(_id: String!): user
//   }
//   type Query {
//     users: [user!]!
//   }

//   type user {
//     id: ID!
//     mail: String!
//     identificacion: String!
//     nombre: String!
//     password: String!
//     rol: String!
//   }

//   type proyecto {
//     id: ID!
//     nombre: String!
//     objGenerales: String!
//     objEspecificos: String!
//     presupuesto: String!
//     fechaIn: String!
//     fechaFin: String!
//   }
//   type Mutation {
//     singUp(input: SingUpInput): AuthUser!
//   }

//   input SingUpInput {
//     mail: String!
//     identificacion: String!
//     nombre: String!
//     password: String!
//     rol: String!
//   }

//   type AuthUser {
//     user: user!
//     token: String!
//   }
// `;*/
// const books = [
//   {
//     title: "",
//     author: "",
//   },
// ];



// const start = async () => {
//   const client = new MongoClient(DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   await client.connect();
//   const db = client.db(DB_NAME);

//   const context = {
//     db,
//   };

//   /*const server = new ApolloServer({ typeDefs, resolvers, context });*/

//   //the listen method launches a web server
//   server.listen().then(({ url }) => {
//     console.log(` Server ready at ${url}`);
//   });
// };

// start();
// /*
// const resolversf = {
//   Query: {
//     users: async (parent, args) => {
//       const user = await UserModel.find();
//       return user;
//     },
//   },
//   Query: {
//     misProyectos: () => [],
//   },
//   Query: {
//     Usuarios: () => {
//       const usuarios = UserModel.find();
//       return usuarios;
//     },
//     /*  Usuarios: async (parent, args) => {
//       const usuarios = await UserModel.find();
//       return usuarios;
//     }, */
//     /*
//     Usuario: async (parent, args) => {
//       const usuario = await UserModel.findOne({ _id: args._id });
//       return usuario;
//     },
//   },

//   //Mutations
//   Mutation: {
//     singUp: async (root, { input }, { db }) => {
//       const hashedPassword = bycrypt.hashSync(input.password);
//       const newUser = {
//         ...input,
//         password: hashedPassword,
//       };
//       const result = await db.collection("user").insertOne(newUser);
//       //Función asincrona que puede recibir tres argumentos y regresa un objeto
//       const user = result.ops[0];
//       return {
//         user,
//         token: "token",
//       };
//     },
//   },
//   user: {
//     id: (root) => {
//       return root.Id;
//     },
//   },
// };*/


