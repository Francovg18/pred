import React, { useState } from 'react';
import { GraduationCap, Calculator, BookOpen, TrendingUp, ChevronRight, User, MapPin, Monitor, Users, Calendar } from 'lucide-react';
import axios from 'axios'; 
const opciones = {
  Periodo: ['PRIMERO', 'SEGUNDO'],
  Genero: ['femenino', 'masculino'],
  Zona: ['achumani', 'alto obrajes', 'villa fatima', 'obrajes', 'miraflores', 'sopocachi'],
  AccesoDispositivos: ['Sí', 'No'],
  TipoDispositivo: ['Laptop', 'Tablet', 'Computadora personal'],
  PreferenciaClases: ['Presencial', 'Semi Presencial', 'Virtual'],
  PlatformaVirtual: ['Classroom', 'Moodle, Classroom', 'Moodle, Classroom, Teams'],
  Meet: ['Zoom Meet', 'Meet de Google', 'Zoom Meet, Meet de Google'],
  Colegio: ['amor de dios', 'cristo rey', 'san ignacio', 'vida nueva'],
  'Administración del Colegio': ['Privada', 'Fiscal', 'Convenio', 'Cema']
};

const materiasInfo = {
  'BIO-99': { icon: '🧬', name: 'Biología', color: 'from-green-400 to-emerald-500' },
  'FIS-99': { icon: '⚡', name: 'Física', color: 'from-blue-400 to-cyan-500' },
  'MAT-99': { icon: '📐', name: 'Matemáticas', color: 'from-purple-400 to-violet-500' },
  'QMC-99': { icon: '⚗️', name: 'Química', color: 'from-orange-400 to-red-500' }
};

const Nota = () => {
  const [formData, setFormData] = useState({
    Gestion: 2012,
    Periodo: '',
    'BIO-99': '',
    'FIS-99': '',
    'MAT-99': '',
    'QMC-99': '',
    Genero: '',
    Zona: '',
    Edad: '',
    AccesoDispositivos: '',
    TipoDispositivo: '',
    PreferenciaClases: '',
    PlatformaVirtual: '',
    Meet: '',
    Colegio: '',
    'Administración del Colegio': ''
  });

  const [resultado, setResultado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/predecir', formData);
      setResultado(res.data);
    } catch (err) {
      alert('Error al predecir: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const getClassificationColor = (clasificacion) => {
    return clasificacion === 'Aprobado' 
      ? 'from-green-400 to-emerald-500' 
      : 'from-red-400 to-rose-500';
  };

  const steps = [
    { id: 1, title: 'Información Personal', icon: User },
    { id: 2, title: 'Calificaciones', icon: BookOpen },
    { id: 3, title: 'Preferencias', icon: Monitor },
    { id: 4, title: 'Resultados', icon: TrendingUp }
  ];

  return (
    <form onSubmit={handleSubmit}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Sistema de Predicción Académica
          </h1>
          <p className="text-gray-600">Predice tu rendimiento académico basado en datos históricos</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  currentStep >= step.id 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className={`w-5 h-5 mx-2 transition-colors duration-300 ${
                    currentStep > step.id ? 'text-blue-600' : 'text-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm border border-white/20 animate-slide-up">
          <div className="space-y-6">
            
            {/* Información Personal */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Información Personal
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Gestión
                  </label>
                  <input 
                    type="number" 
                    name="Gestion" 
                    value={formData.Gestion} 
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Período</label>
                  <select 
                    name="Periodo" 
                    value={formData.Periodo} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  >
                    <option value="">-- Selecciona --</option>
                    {opciones.Periodo.map((op) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                  <select 
                    name="Genero" 
                    value={formData.Genero} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  >
                    <option value="">-- Selecciona --</option>
                    {opciones.Genero.map((op) => (
                      <option key={op} value={op}>{op.charAt(0).toUpperCase() + op.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Zona
                  </label>
                  <select 
                    name="Zona" 
                    value={formData.Zona} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  >
                    <option value="">-- Selecciona --</option>
                    {opciones.Zona.map((op) => (
                      <option key={op} value={op}>{op.charAt(0).toUpperCase() + op.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                  <input 
                    type="number" 
                    name="Edad" 
                    value={formData.Edad} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Colegio</label>
                  <select 
                    name="Colegio" 
                    value={formData.Colegio} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  >
                    <option value="">-- Selecciona --</option>
                    {opciones.Colegio.map((op) => (
                      <option key={op} value={op}>{op.charAt(0).toUpperCase() + op.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div className="group md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Administración del Colegio</label>
                  <select 
                    name="Administración del Colegio" 
                    value={formData['Administración del Colegio']} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                  >
                    <option value="">-- Selecciona --</option>
                    {opciones['Administración del Colegio'].map((op) => (
                      <option key={op} value={op}>{op}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Calificaciones */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Calificaciones por Materia
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(materiasInfo).map(([materia, info]) => (
                  <div key={materia} className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <span className="mr-2">{info.icon}</span>
                      {info.name}
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        name={materia} 
                        value={formData[materia]} 
                        onChange={handleChange} 
                        required
                        min="0"
                        max="100"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                        placeholder="0-100"
                      />
                      <div className={`absolute inset-y-0 right-0 w-1 bg-gradient-to-b ${info.color} rounded-r-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-200`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferencias Tecnológicas */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Monitor className="w-5 h-5 mr-2 text-blue-600" />
                Preferencias y Recursos
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['AccesoDispositivos', 'TipoDispositivo', 'PreferenciaClases', 'PlatformaVirtual', 'Meet'].map((campo) => (
                  <div key={campo} className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {campo.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <select 
                      name={campo} 
                      value={formData[campo]} 
                      onChange={handleChange} 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 group-hover:border-gray-400"
                    >
                      <option value="">-- Selecciona --</option>
                      {opciones[campo].map((op) => (
                        <option key={op} value={op}>{op}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button 
                type="submit" 
                disabled={isLoading}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Procesando...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Predecir Rendimiento
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {resultado && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full mb-4 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">📊 Resultados de la Predicción</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nota Estimada */}
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Nota Estimada</h4>
                <div className={`text-5xl font-bold bg-gradient-to-r ${getClassificationColor(resultado.clasificacion)} bg-clip-text text-transparent mb-2`}>
                  {resultado.nota_estimada}
                </div>
                <p className="text-gray-600">de 100 puntos</p>
              </div>

              {/* Clasificación */}
              <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-100">
                <h4 className="text-lg font-semibold text-gray-700 mb-3">Clasificación</h4>
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-white font-semibold bg-gradient-to-r ${getClassificationColor(resultado.clasificacion)} shadow-lg`}>
                  {resultado.clasificacion === 'Aprobado' ? '✅' : '❌'} {resultado.clasificacion}
                </div>
              </div>
            </div>

            {/* Probabilidades */}
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-4 text-center">Distribución de Probabilidades</h4>
              <div className="space-y-3">
                {Object.entries(resultado.probabilidades).map(([clase, prob]) => (
                  <div key={clase} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{clase}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${prob * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-600 w-12">
                        {Math.round(prob * 10000) / 100}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
    </form>
  );
};

export default Nota;
