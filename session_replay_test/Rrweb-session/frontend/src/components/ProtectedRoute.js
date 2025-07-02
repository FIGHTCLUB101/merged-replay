// frontend/src/components/ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// export default function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// }

// frontend/src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>; // 👈 Wait for auth check

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
