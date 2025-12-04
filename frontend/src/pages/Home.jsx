import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Fácil y Rápido",
      description: "Crea tu CV profesional en minutos con nuestro asistente paso a paso.",
      icon: "⚡"
    },
    {
      title: "Vista Previa Real",
      description: "Observa los cambios al instante mientras editas tu información.",
      icon: "👀"
    },
    {
      title: "Exportación PDF",
      description: "Descarga tu curriculum en formato PDF listo para enviar.",
      icon: "📄"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="w-full p-6 flex justify-between items-center z-10">
        <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          CVGenerator
        </div>
        <button
          onClick={() => navigate('/login')}
          className="text-slate-300 hover:text-white font-medium transition-colors"
        >
          Admin Access
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 z-10 text-center mt-10 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Crea el CV que <br />
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              consigue entrevistas
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Diseña un curriculum vitae profesional, moderno y efectivo en cuestión de minutos.
            Sin complicaciones, totalmente gratis.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/crear-cv')}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all"
          >
            Comenzar Ahora →
          </motion.button>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto px-6 py-20 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-slate-500 text-sm z-10 border-t border-slate-800">
        © {new Date().getFullYear()} CVGenerator. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default Home;
