
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
// import { motion } from 'framer-motion';

// const dataLine = [
//   { name: '7/03', uv: 30 },
//   { name: '10/03', uv: 40 },
//   { name: '13/03', uv: 25 },
//   { name: '17/03', uv: 50 },
//   { name: '20/03', uv: 35 },
//   { name: '23/03', uv: 45 },
//   { name: '31/03', uv: 38 },
// ];

// const pieData = [
//   { name: 'Windows', value: 70 },
//   { name: 'Mac', value: 30 },
// ];

// const COLORS = ['#0088FE', '#00C49F'];

// const Landing = () => {
//   return (
//     <div className="bg-[#0B0A2F] min-h-screen text-white font-sans">
//       <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
//         <motion.div 
//           initial={{ opacity: 0, x: -50 }} 
//           animate={{ opacity: 1, x: 0 }} 
//           transition={{ duration: 1 }} 
//           className="md:w-1/2"
//         >
//           <h1 className="text-4xl md:text-6xl font-bold mb-6">
//             Session replay & product analytics <br /> you can <span className="text-blue-400">self-host</span>
//           </h1>
//           <p className="mb-6 text-lg text-gray-300">
//             See exactly how users interact with your app. Identify frictions, understand user behavior, troubleshoot and fix every issue, faster.
//           </p>
//           <div className="flex gap-4">
//             <a href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">Sign Up</a>
//             <a href="/login" className="border border-white text-white px-6 py-3 rounded-lg font-medium">Login</a>
//           </div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1 }}
//           className="md:w-1/2 mt-10 md:mt-0"
//         >
//           <div className="bg-white rounded-xl p-4 shadow-lg">
//             <h2 className="text-black text-lg font-semibold mb-2">Deployments</h2>
//             <ResponsiveContainer width="100%" height={200}>
//               <LineChart data={dataLine}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white mt-6 rounded-xl p-4 shadow-lg">
//             <h2 className="text-black text-lg font-semibold mb-2">User Environment</h2>
//             <ResponsiveContainer width="100%" height={200}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={40}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   paddingAngle={5}
//                   dataKey="value"
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                   ))}
//                 </Pie>
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Landing;


import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import starfield from '../assets/starfield.svg'; // ✅ Imported background image

const dataLine = [
  { name: '7/03', uv: 30 },
  { name: '10/03', uv: 40 },
  { name: '13/03', uv: 25 },
  { name: '17/03', uv: 50 },
  { name: '20/03', uv: 35 },
  { name: '23/03', uv: 45 },
  { name: '31/03', uv: 38 },
];

const pieData = [
  { name: 'Windows', value: 70 },
  { name: 'Mac', value: 30 },
];

const COLORS = ['#0088FE', '#00C49F'];

const Landing = () => {
  return (
    <div className="bg-[#0B0A2F] min-h-screen text-white font-sans relative overflow-hidden">
      {/* Background Starfield */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-black via-[#0B0A2F] to-[#0B0A2F] opacity-50" />
        <div
          className="absolute w-full h-full bg-cover bg-center bg-repeat opacity-10"
          style={{ backgroundImage: `url(${starfield})` }}
        />
      </div>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Self-Hosted Session Replay
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Visualize how users navigate your product in real time. Debug, optimize, and understand your users.
          </p>

          {/* Standard Auth */}
          <div className="flex justify-center gap-6 mt-6">
            <a
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg font-medium transition-all duration-300"
            >
              Sign Up
            </a>
            <a
              href="/login"
              className="border border-white hover:bg-white hover:text-black text-white px-6 py-3 rounded-xl shadow-lg font-medium transition-all duration-300"
            >
              Login
            </a>
          </div>

          {/* OAuth Buttons */}
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="/auth/google"
              className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all"
            >
              <FaGoogle /> Sign in with Google
            </a>
            <a
              href="/auth/github"
              className="flex items-center gap-2 bg-[#171515] text-white px-5 py-3 rounded-xl font-medium hover:bg-black transition-all"
            >
              <FaGithub /> Sign in with GitHub
            </a>
          </div>
        </motion.div>

        {/* Demo Session Replay */}
        <div className="bg-[#1A1A3D] rounded-xl p-6 mb-10 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">User Session Replay</h2>
          <div className="bg-black text-green-400 p-4 rounded-md font-mono mb-2">
            ▶ Replaying: <span className="text-cyan-400">user123_login → product_view → checkout</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 animate-pulse" style={{ width: '65%' }} />
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>0:00</span>
            <span>1:45</span>
          </div>
        </div>

        {/* Live Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#1A1A3D] rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Live Analytics</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={dataLine}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line type="monotone" dataKey="uv" stroke="#00c6ff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Environment Split */}
          <div className="bg-[#1A1A3D] rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Environment Split</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
