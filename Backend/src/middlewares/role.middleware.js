// src/middlewares/role.middleware.js
export default function requireRole(allowedRoles = []) {
  // allowedRoles: array or single string
  if (!Array.isArray(allowedRoles)) allowedRoles = [allowedRoles];
  return async (req, res, next) => {
    try {
      // auth.middleware should have set req.userId
      if (!req.userId) return res.status(401).json({ message: "Not authenticated" });
      // lazy-load User to check role
      const User = (await import("../models/User.js")).default;
      const user = await User.findById(req.userId).select("role");
      if (!user) return res.status(401).json({ message: "User not found" });
      if (!allowedRoles.includes(user.role)) return res.status(403).json({ message: "Forbidden" });
      next();
    } catch (err) { next(err); }
  };
}
