// // frontend/src/App.js
// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './context/AuthContext';
// import './index.css'; 
// import Signup from './components/Auth/Signup';
// import Login from './components/Auth/Login';
// import Dashboard from './components/Dashboard';
// import Recorder from './components/Recorder';
// import ReplayViewer from './components/ReplayViewer';
// import ProtectedRoute from './components/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/record"
//           element={
//             <ProtectedRoute>
//               <Recorder />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/replay/:sessionId"
//           element={
//             <ProtectedRoute>
//               <ReplayViewer />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;
//---------------------------------------------

// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import './index.css';
import Landing from './components/Landing';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard';
import Recorder from './components/Recorder';
import ReplayViewer from './components/ReplayViewer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* 👇 Default route shows Landing page */}
        <Route path="/" element={<Landing />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/record"
          element={
            <ProtectedRoute>
              <Recorder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/replay/:sessionId"
          element={
            <ProtectedRoute>
              <ReplayViewer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
