
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const res = await api.login({ email, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-400">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-sm animate-fade-in-down">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={isLoading}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white font-semibold py-2 rounded-xl hover:bg-green-700 transition"
          >
            {isLoading ? 'Signing in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

//---------------------------------------------------------------------------------------------


// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import api from '../../services/api';

// export default function Login() {
//   const [email, setEmail]           = useState('');
//   const [password, setPassword]     = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError]           = useState('');
//   const [isLoading, setIsLoading]   = useState(false);

//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   // Discrete transforms per character
//   const gearAngle    = (email.length * 20) % 360;        // 20° per keystroke
//   const medAngle     = -gearAngle * (16 / 12);           // inverse ratio
//   const smallAngle   = gearAngle * (16 / 8);
//   const ropeLift     = Math.min(password.length * 15, 120);  // 15 px per char
//   const leverAngle   = Math.min(password.length * 2, 12);    // 2° per char

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//     try {
//       const res = await api.login({ email, password });
//       login(res.data.token);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Error during login');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden">
//       {/* — SVG Machine — */}
//       <svg viewBox="0 0 1200 800" className="absolute inset-0 w-full h-full pointer-events-none">
//         {/* Title */}
//         <text x="600" y="60" textAnchor="middle" fontSize="36" fill="#333" fontWeight="bold">
//           The Website:
//         </text>

//         {/* Large Gear */}
//         <g transform={`translate(900,200) rotate(${gearAngle})`}>
//           <circle cx="0" cy="0" r="60" fill="none" stroke="#666" strokeWidth="3" />
//           {[...Array(16)].map((_,i) => (
//             <rect
//               key={i}
//               x="-2" y="-72" width="4" height="12" fill="#666"
//               transform={`rotate(${i * 22.5})`}
//             />
//           ))}
//           <circle cx="0" cy="0" r="12" fill="#666" />
//         </g>

//         {/* Medium Gear */}
//         <g transform={`translate(800,250) rotate(${medAngle})`}>
//           <circle cx="0" cy="0" r="40" fill="none" stroke="#777" strokeWidth="2" />
//           {[...Array(12)].map((_,i) => (
//             <rect
//               key={i}
//               x="-2" y="-52" width="4" height="10" fill="#777"
//               transform={`rotate(${i * 30})`}
//             />
//           ))}
//           <circle cx="0" cy="0" r="8" fill="#777" />
//         </g>

//         {/* Small Gear */}
//         <g transform={`translate(750,180) rotate(${smallAngle})`}>
//           <circle cx="0" cy="0" r="25" fill="none" stroke="#888" strokeWidth="2" />
//           {[...Array(8)].map((_,i) => (
//             <rect
//               key={i}
//               x="-2" y="-33" width="4" height="8" fill="#888"
//               transform={`rotate(${i * 45})`}
//             />
//           ))}
//           <circle cx="0" cy="0" r="5" fill="#888" />
//         </g>

//         {/* Bottom‐left hand pulling rope */}
//         <g transform={`translate(330,540) translate(0,${-ropeLift})`}>
//           <path d="M0,0 l20,-10 l0,20 z" fill="#f4a261" />
//         </g>

//         {/* Pulley & rope */}
//         <g>
//           <circle cx="300" cy="400" r="30" fill="none" stroke="#666" strokeWidth="4" />
//           <circle cx="300" cy="400" r="6" fill="#666" />
//           <line x1="300" y1="360" x2="300" y2="380" stroke="#666" strokeWidth="3" />
//           <rect x="290" y="350" width="20" height="10" rx="3" fill="#666" />
//           <line
//             x1="330"
//             y1="400"
//             x2="330"
//             y2={540 - ropeLift}
//             stroke="#a0522d"
//             strokeWidth="4"
//             strokeDasharray="8,4"
//           />
//           <rect
//             x="320"
//             y={540 - ropeLift}
//             width="20"
//             height="30"
//             rx="4"
//             fill="#333"
//           />
//           <path
//             d={`M 330 ${540 - ropeLift} Q 500 480 730 410`}
//             fill="none"
//             stroke="#a0522d"
//             strokeWidth="2"
//             strokeDasharray="6,3"
//           />
//         </g>

//         {/* Email Kettlebell */}
//         <g transform="translate(500,240)">
//           <circle cx="0" cy="0" r="15" fill="#333" />
//           <rect x="-10" y="-25" width="20" height="10" rx="5" fill="#333" />
//         </g>

//         {/* Email & Password Boxes */}
//         <rect x="540" y="210" width="300" height="40" rx="8" fill="none" stroke="#ccc" strokeWidth="2" />
//         <rect x="540" y="270" width="300" height="40" rx="8" fill="none" stroke="#ccc" strokeWidth="2" />

//         {/* Lever & Grey Slab */}
//         <g>
//           <polygon points="850,420 870,390 830,390" fill="#666" />
//           <line
//             x1="730" y1="400" x2="970" y2="400"
//             stroke="#666" strokeWidth="6"
//             transform={`rotate(${leverAngle} 850 400)`}
//           />
//           <rect
//             x="780" y="200"
//             width="20" height={120 - ropeLift}
//             fill="#ddd"
//           />
//         </g>

//         {/* Right‐hand Pointer */}
//         <g
//           transform={`translate(${800 + Math.cos(medAngle*Math.PI/180)*60},${
//             250 + Math.sin(medAngle*Math.PI/180)*60
//           }) rotate(${medAngle + 45})`}
//         >
//           <ellipse cx="0" cy="0" rx="12" ry="22" fill="#f4a261" />
//           <rect x="-3" y="-18" width="3" height="12" rx="1" fill="#f4a261" />
//           <rect x="-1" y="-20" width="3" height="14" rx="1" fill="#f4a261" />
//         </g>

//         {/* Soap Bottle & Drops */}
//         <g>
//           <rect x="910" y="500" width="30" height="60" rx="6" fill="none" stroke="#666" strokeWidth="2" />
//           <rect
//             x="915" y="520" width="20" height="40" fill="#e2e8f0"
//             className={isLoading ? 'animate-pulse' : ''}
//           />
//           <path d="M 910 500 L 945 500 L 945 505 L 910 505 Z" fill="#666" />
//           {isLoading && [0,1,2].map(i => (
//             <circle
//               key={i}
//               cx={945 + i*4} cy={530 + i*10} r="2"
//               fill="#3b82f6" className="animate-bounce"
//               style={{ animationDelay: `${i*0.2}s` }}
//             />
//           ))}
//         </g>

//         {/* Bouncing Balls */}
//         {[...Array(6)].map((_,i) => (
//           <circle
//             key={i}
//             cx={400 + i*30}
//             cy={700 + (email.length>0 ? (i%2 ? -10 : 10) : 0)}
//             r="8" fill="#e53e3e"
//             className="transition-all duration-300"
//           />
//         ))}

//         {/* Smoke */}
//         {isLoading && [0,1,2].map(i => (
//           <circle
//             key={i}
//             cx={950 + i*8} cy={480 - i*20}
//             r={4 - i} fill="#bbb"
//             opacity={0.6 - i*0.2} className="animate-pulse"
//             style={{ animationDelay: `${i*0.3}s` }}
//           />
//         ))}
//       </svg>

//       {/* Transparent Login Panel */}
//       <div
//         className={`
//           relative z-10 w-full max-w-md
//           bg-white/30 backdrop-blur-lg
//           rounded-3xl p-8
//           border border-white/50
//           shadow-2xl
//         `}
//       >
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 drop-shadow">
//           Login
//         </h2>

//         {error && (
//           <div className="bg-red-100/80 text-red-700 p-3 mb-4 rounded text-sm">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email" placeholder="Email"
//             value={email} onChange={e => setEmail(e.target.value)}
//             disabled={isLoading} required
//             className={`
//               w-full px-4 py-2 border rounded-lg focus:outline-none transition
//               ${email.length>0
//                 ? 'border-green-400 bg-green-50/60 shadow-inner'
//                 : 'border-gray-300 bg-white/80'}
//             `}
//           />
//           <input
//             type="password" placeholder="Password"
//             value={password} onChange={e => setPassword(e.target.value)}
//             disabled={isLoading} required
//             className={`
//               w-full px-4 py-2 border rounded-lg focus:outline-none transition
//               ${password.length>0
//                 ? 'border-blue-400 bg-blue-50/60 shadow-inner'
//                 : 'border-gray-300 bg-white/80'}
//             `}
//           />

//           <div className="flex items-center">
//             <input
//               type="checkbox" id="remember" checked={rememberMe}
//               onChange={e => setRememberMe(e.target.checked)}
//               className="mr-2 w-4 h-4 text-green-600 border-gray-300 rounded"
//             />
//             <label htmlFor="remember" className="text-sm text-gray-800">
//               Remember me
//             </label>
//           </div>

//           <button
//             type="submit" disabled={isLoading}
//             className={`
//               w-full py-2 rounded-xl text-white font-semibold transition
//               ${isLoading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : email.length>0 && password.length>0
//                 ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
//                 : 'bg-gray-500'}
//             `}
//           >
//             {isLoading ? 'Signing in…' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
