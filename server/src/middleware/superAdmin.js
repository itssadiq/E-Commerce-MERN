const SuperAdminMiddleware = (req, res, next) => {
  // req.user is already populated by your AuthMiddleware
  if (req.user && req.user.isSuperAdmin) {
    next();
  } else {
    res.status(403).send({
      message: "Access Denied. Super Admin privileges required.",
    });
  }
};

module.exports = { SuperAdminMiddleware };
