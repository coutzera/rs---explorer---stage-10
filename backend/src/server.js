require("express-async-errors");
//Importação das bibliotecas
const express = require("express");
const cors = require("cors");

//Importação criada
const routes = require("./routes");
const AppError = require("./utils/AppError");
const migrationsRun = require("./database/sqlite/migrations");
const uploadConfig = require("./configs/upload");

//Atribuição do App com o Express
const app = express();

// Declaração dos usos da aplicação
app.use(cors());
app.use(express.json());
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER));
app.use(routes);
app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

//Inicializando o banco de dados
migrationsRun();

//Declaração de inicialização do servidor
const PORT = 3033;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
