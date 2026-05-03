export const authMiddleware = (req, res, next) => {
  req.userId = 1; // фиксированный пользователь
  req.user = { userId: 1 };

  next();
};