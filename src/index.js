const { ApolloServer, gql } = require("apollo-server");
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const { DB_URI, DB_NAME } = process.env;
const bycrypt = require("bcryptjs");

const typeDefs = gql`
  type Query {
    misProyectos: [proyecto!]!
  }

  type user {
    id: ID!
    mail: String!
    identificacion: String!
    nombre: String!
    password: String!
    rol: String!
  }

  type proyecto {
    id: ID!
    nombre: String!
    objGenerales: String!
    objEspecificos: String!
    presupuesto: String!
    fechaIn: String!
    fechaFin: String!
    user: [user!]!
  }
  type Mutation {
    singUp(input: SingUpInput): AuthUser!
  }


  input SingUpInput {
    mail: String!
    identificacion: String!
    nombre: String!
    password: String!
    rol: String!
  }

  type AuthUser {
    user: user!
    token: String!
  }
`;
const books = [
  {
    title: "",
    author: "",
  },
];

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

const resolvers = {
  Query: {
    misProyectos: () => [],
  },
  //Mutations
  Mutation: {
    singUp: async (root, { input }, { db }) => {
      const hashedPassword = bycrypt.hashSync(input.password);
      const newUser = {
        ...input,
        password: hashedPassword,
      };
      const result = await db.collection("user").insertOne(newUser);
      //Función asincrona que puede recibir tres argumentos y regresa un objeto
      const user = result.ops[0];
      return {
        user,
        token: "token",
      };
    },
  },
  user:{
    id:(root) => {
        return root.Id;
    }
  }
};


