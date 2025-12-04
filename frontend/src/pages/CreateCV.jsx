import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import { personalDataSchema, experienceItemSchema, educationItemSchema } from '../schemas/cvSchema';
import StepIndicator from '../components/ui/StepIndicator';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import PersonalDataForm from '../components/wizard/PersonalDataForm';
import ExperienceForm from '../components/wizard/ExperienceForm';
import EducationForm from '../components/wizard/EducationForm';
import SkillsForm from '../components/wizard/SkillsForm';
import ThemeSelectionForm from '../components/wizard/ThemeSelectionForm';
import CVPreview from '../components/wizard/CVPreview';

function CreateCV() {
  const baseURL = import.meta.env.VITE_API_URL || '/api';
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener ID si estamos editando
  const isEditing = !!id;

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [loading, setLoading] = useState(isEditing);

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    telefono: '',
    ciudad: '',
    habilidades: [],
    idiomas: [],
    experiencia: [
      { empresa: '', cargo: '', fechaInicio: '', fechaFin: '', descripcion: '', habilidades: [''] }
    ],
    educacion: [
      { institucion: '', titulo: '', fechaInicio: '', fechaFin: '', descripcion: '' }
    ],
    theme: 'green'
  });

  // Cargar datos si estamos editando
  useEffect(() => {
    if (isEditing) {
      const fetchCV = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${baseURL}/cv/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = response.data;

          // Formatear fechas para los inputs (YYYY-MM-DD)
          const formatDate = (dateString) => dateString ? dateString.split('T')[0] : '';

          setForm({
            ...data,
            fechaNacimiento: formatDate(data.fechaNacimiento),
            experiencia: data.experiencia.map(e => ({
              ...e,
              fechaInicio: formatDate(e.fechaInicio),
              fechaFin: formatDate(e.fechaFin)
            })),
            educacion: data.educacion.map(e => ({
              ...e,
              fechaInicio: formatDate(e.fechaInicio),
              fechaFin: formatDate(e.fechaFin)
            }))
          });
        } catch (error) {
          console.error('Error al cargar CV:', error);
          toast.error('No se pudo cargar el CV para editar');
          navigate('/admin');
        } finally {
          setLoading(false);
        }
      };
      fetchCV();
    }
  }, [id, isEditing, baseURL, navigate]);

  const [errors, setErrors] = useState({});

  const updateForm = (newData) => {
    setForm(prev => ({ ...prev, ...newData }));
    // Limpiar errores al escribir
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  const validateStep = () => {
    setErrors({});
    const newErrors = {};
    let isValid = true;

    if (currentStep === 1) {
      const result = personalDataSchema.safeParse(form);
      if (!result.success) {
        isValid = false;
        result.error.issues.forEach(issue => {
          const key = issue.path.join('.');
          newErrors[key] = issue.message;
          toast.error(issue.message);
        });
      }
    } else if (currentStep === 2) {
      form.experiencia.forEach((exp, index) => {
        // Validar solo si tiene algún campo relleno (ignorar filas vacías)
        const isFilled = exp.empresa || exp.cargo || exp.fechaInicio || exp.descripcion;
        if (isFilled) {
          const result = experienceItemSchema.safeParse(exp);
          if (!result.success) {
            isValid = false;
            result.error.issues.forEach(issue => {
              const key = `${index}.${issue.path.join('.')}`;
              newErrors[key] = issue.message;
              toast.error(`Experiencia ${index + 1}: ${issue.message}`);
            });
          }
        }
      });
    } else if (currentStep === 3) {
      form.educacion.forEach((edu, index) => {
        const isFilled = edu.institucion || edu.titulo || edu.fechaInicio || edu.descripcion;
        if (isFilled) {
          const result = educationItemSchema.safeParse(edu);
          if (!result.success) {
            isValid = false;
            result.error.issues.forEach(issue => {
              const key = `${index}.${issue.path.join('.')}`;
              newErrors[key] = issue.message;
              toast.error(`Educación ${index + 1}: ${issue.message}`);
            });
          }
        }
      });
    }

    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < totalSteps) setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    const limpiarDatos = (formData) => {
      return {
        ...formData,
        habilidades: formData.habilidades?.filter(h => h.trim() !== '') || [],
        idiomas: formData.idiomas?.filter(i => i.trim() !== '') || [],
        experiencia: formData.experiencia.filter(exp =>
          exp.empresa?.trim() !== '' || exp.cargo?.trim() !== ''
        ),
        educacion: formData.educacion.filter(edu =>
          edu.institucion?.trim() !== '' || edu.titulo?.trim() !== ''
        )
      };
    };

    const formLimpio = limpiarDatos(form);
    console.log('Enviando datos a:', `${baseURL}/cv/${isEditing ? id : ''}`);

    const toastId = toast.loading(isEditing ? 'Actualizando CV...' : 'Creando CV...');

    try {
      let response;
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      if (isEditing) {
        response = await axios.put(`${baseURL}/cv/${id}`, formLimpio, { headers });
      } else {
        response = await axios.post(`${baseURL}/cv`, formLimpio, { headers });
      }

      console.log('Respuesta:', response);

      if (response.data) {
        toast.success(isEditing ? '¡CV actualizado!' : '¡CV creado con éxito!', { id: toastId });
        // Si editamos, volvemos al admin, si creamos, vamos a la vista previa
        if (isEditing) {
          navigate(`/vista-previa/${id}`);
        } else {
          navigate(`/vista-previa/${response.data.cv._id}`);
        }
      } else {
        throw new Error('Respuesta del servidor inválida');
      }

    } catch (error) {
      console.error('❌ Error al enviar CV:', error);
      toast.error('Error al guardar el CV. Revisa la consola.', { id: toastId });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalDataForm data={form} updateData={updateForm} errors={errors} />;
      case 2: return <ExperienceForm data={form.experiencia} updateData={updateForm} errors={errors} />;
      case 3: return <EducationForm data={form.educacion} updateData={updateForm} errors={errors} />;
      case 4: return <SkillsForm data={form} updateData={updateForm} />;
      case 5: return <ThemeSelectionForm currentTheme={form.theme} setTheme={updateForm} />;
      default: return null;
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">Cargando datos...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-green-400">
          {isEditing ? 'Editar Curriculum' : 'Crear Curriculum'}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna Izquierda: Formulario */}
          <div>
            <StepIndicator currentStep={currentStep} steps={['Datos', 'Experiencia', 'Educación', 'Habilidades', 'Diseño']} />

            <Card className="mb-8 min-h-[400px]">
              {renderStep()}
            </Card>

            <div className="flex justify-between mt-8">
              <Button
                variant="secondary"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={currentStep === 1 ? 'opacity-0' : ''}
              >
                ← Anterior
              </Button>

              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Siguiente →
                </Button>
              ) : (
                <Button onClick={handleSubmit} variant="primary">
                  {isEditing ? 'Guardar Cambios' : 'Finalizar y Ver CV'}
                </Button>
              )}
            </div>
          </div>

          {/* Columna Derecha: Vista Previa */}
          <div>
            <CVPreview data={form} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCV;
