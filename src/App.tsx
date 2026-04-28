import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Decorative background blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 max-w-3xl text-center space-y-8 backdrop-blur-sm bg-white/40 p-12 rounded-3xl shadow-xl border border-white/50">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-white/80 shadow-sm text-sm font-medium text-slate-700 backdrop-blur-md mb-4">
          <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
          Medi-Q Project Initialized
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">
          Welcome to <br />
          <span className="text-gradient leading-tight">Medi-Q Platform</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Your modern React application is up and running. 
          Configured with Vite, TypeScript, TailwindCSS v4, and automated Netlify deployments.
        </p>

        <div className="pt-6 flex flex-wrap justify-center gap-4">
          <button className="px-8 py-3 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-md">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-full bg-white text-slate-900 font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md shadow-sm">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
