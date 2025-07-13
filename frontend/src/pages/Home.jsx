import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      <div className="w-full flex justify-end p-4">
      <button
        onClick={() => navigate('/login')}
        className="bg-slate-700 hover:bg-slate-600 text-sm px-4 py-2 rounded-lg shadow-md transition"
      >
        Admin
      </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Bienvenido a tu Generador de CV</h1>
        <button
          onClick={() => navigate('/crear-cv')}
          className="bg-green-500 hover:bg-green-600 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition"
        >
          Crear Curriculum
        </button>
      </div>
    </div>
  );
}

export default Home;
