import jwt from "jsonwebtoken";

const generateToken = async (data) => {
  return await jwt.sign({data: data}, process.env.KEY_JWT, {expiresIn: 86400});
};

const getToken = async (request, requireAuth = true) => {
  let token = request.request.headers.authorization;

  if (!token && requireAuth) {
    throw new Error("Authorization token required.");
  }

  if (token) {
    token = token.replace("Bearer ", "");
    return await jwt.verify(token, process.env.KEY_JWT);
  }

  return null;
};

const getMessierToken = async (request, requireAuth = true) => {
  let token = request.request.headers.messier;

  if (!token && requireAuth) {
    throw new Error("Messier token required.");
  }

  if (token) {
    token = token.replace("Bearer ", "");
    return await token;
  }

  return null;
};

export {
  generateToken,
  getToken,
  getMessierToken,
};
