// middleware/role.js
module.exports = function(requiredRole) {
    return (req, res, next) => {
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ error: 'Access Denied: Insufficient permissions' });
      }
      next();
    };
  };
  