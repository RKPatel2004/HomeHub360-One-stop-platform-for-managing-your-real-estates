// middleware/userRoles.js
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // Check if user object exists from the verifyToken middleware
    if (!req.user) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied: User not authenticated' 
      });
    }
    
    // Check if the user has a role property in the decoded token
    if (!req.user.role) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied: User role not found in token' 
      });
    }
    
    // Check if the user's role is allowed
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