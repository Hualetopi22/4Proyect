import mongoose from "mongoose";

const conectarDB = async () => {
  return await mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Conexión Éxitosa");
    })
    .catch((e) => {
      console.error("Error de conexión a la BD", e);
    });
};

export default conectarDB;
