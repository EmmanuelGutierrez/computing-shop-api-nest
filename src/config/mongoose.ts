/* import mongoose from "mongoose";

const { mongo, ENV, api } = require("./config");

const connectionString: string = mongo.DB_HOST
  ? `mongodb+srv://${mongo.dbUser}:${mongo.dbPassword}@${mongo.dbHost}:${api.port}/${mongo.dbName}?retryWrites=true&w=majority`
  : mongo.dbLocal;

console.log(connectionString);
mongoose
  .connect(connectionString)
  .then((db) => console.log("Base de datos conectada"))
  .catch((err) => console.log("Error: ", err));
 */
