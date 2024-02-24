const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    throw new AppError("Formato de token inválido", 401);
  }
  const token = tokenParts[1];

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    request.user = {
      id: Number(user_id),
    };
    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Token JWT inválido", 401);
    } else if (error.name === "TokenExpiredError") {
      throw new AppError("Token JWT expirado", 401);
    } else {
      throw new AppError("Erro ao verificar o token JWT", 500);
    }
  }
}

module.exports = ensureAuthenticated;
