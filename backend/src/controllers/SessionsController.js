const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

class SessionsController {
  async create(request, response) {
    const { mail, pass } = request.body;

    const user = await knex("users").where({ mail }).first();

    if (!user) {
      throw new AppError("E-mail e/ou senha inválidos", 401);
    }

    const passMatched = await compare(pass, user.pass);

    if (!passMatched) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });
    return response.json({ user, token });
  }
}
module.exports = SessionsController;
