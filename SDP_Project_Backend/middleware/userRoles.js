const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied: User not authenticated' 
      });
    }
    
    if (!req.user.role) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied: User role not found in token' 
      });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied: Role (${req.user.role}) is not authorized to access this resource` 
      });
    }
    
    next();
  };
};

module.exports = authorizeRoles;