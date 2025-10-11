import jwt  from 'jsonwebtoken';
const JWT_SECRET = "03071593";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("🔎 Header Authorization recibido:", authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: "Token requerido" });
  }

  // Eliminar el prefijo "Bearer " y las comillas dobles
  const token = authHeader.split(" ")[1]?.replace(/"/g, "");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token inválido o expirado" });
  }
};

export default authMiddleware;
