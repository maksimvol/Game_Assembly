import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRoles, children }: any) => {
    if (!user) {
      return <Navigate to ="/login" />
    }
    
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }

    return children;
  };
  
  export default ProtectedRoute;