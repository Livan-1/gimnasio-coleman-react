// src/components/Classes.js
import { useState } from 'react';

function Classes() {
  // Estado para las clases y filtros
  const [classes, setClasses] = useState([
    {
      id: 'CL-001',
      name: 'Spinning Intenso',
      duration: 45,
      difficulty: 'Intermedio',
      currentCapacity: 8,
      maxCapacity: 12,
      category: 'cardio',
      instructor: 'María González',
      schedule: 'Lunes y Miércoles 18:00',
      description: 'Clase de spinning de alta intensidad para mejorar resistencia cardiovascular.',
      image: '/spinin_fake_coleman.jpg', // ← Nueva propiedad
      imageAlt: 'Clase de spinning en gimnasio Coleman'
    },
    {
      id: 'CL-002',
      name: 'Crossfit Funcional',
      duration: 60,
      difficulty: 'Avanzado',
      currentCapacity: 3,
      maxCapacity: 10,
      category: 'fuerza',
      instructor: 'Carlos Rodríguez',
      schedule: 'Martes y Jueves 19:00',
      description: 'Entrenamiento funcional de alta intensidad con variedad de ejercicios.',
      image: '/crossfit_fake_coleman.jpg',
      imageAlt: 'Clase de crossfit funcional'
    },
    {
      id: 'CL-003',
      name: 'Yoga Restaurativo',
      duration: 50,
      difficulty: 'Todos',
      currentCapacity: 10,
      maxCapacity: 14,
      category: 'flexibilidad',
      instructor: 'Ana Silva',
      schedule: 'Lunes a Viernes 07:00',
      description: 'Yoga suave enfocado en relajación y flexibilidad.',
      image: '/yoga_fake_coleman.jpg',
      imageAlt: 'Clase de yoga restaurativo'
    },
    {
      id: 'CL-004',
      name: 'Boxeo Fitness',
      duration: 55,
      difficulty: 'Intermedio',
      currentCapacity: 6,
      maxCapacity: 8,
      category: 'cardio',
      instructor: 'Pedro Martínez',
      schedule: 'Miércoles y Viernes 20:00',
      description: 'Clase de boxeo para mejorar condición física y coordinación.',
      image: '/boxeo_fake_coleman.jpg',
      imageAlt: 'Clase de boxeo fitness'
    },
    {
      id: 'CL-005',
      name: 'Pilates Mat',
      duration: 50,
      difficulty: 'Principiante',
      currentCapacity: 5,
      maxCapacity: 10,
      category: 'flexibilidad',
      instructor: 'Laura Fernández',
      schedule: 'Lunes y Jueves 17:00',
      description: 'Pilates en colchoneta para fortalecer core y mejorar postura.',
      image: '/pilates_fake_coleman.jpg',
      imageAlt: 'Clase de pilates mat'
    },
    {
      id: 'CL-006',
      name: 'TRX Training',
      duration: 40,
      difficulty: 'Intermedio',
      currentCapacity: 4,
      maxCapacity: 6,
      category: 'fuerza',
      instructor: 'Javier López',
      schedule: 'Martes y Viernes 18:30',
      description: 'Entrenamiento en suspensión para fuerza funcional.',
      image: '/trx_fake_coleman.jpg',
      imageAlt: 'Clase de TRX training'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedDifficulty, setSelectedDifficulty] = useState('todos');
  const [reservationMessage, setReservationMessage] = useState('');

  // Filtrar clases
  const filteredClasses = classes.filter(clase => {
    const categoryMatch = selectedCategory === 'todos' || clase.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'todos' || clase.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  // Función para reservar clase
  const handleReserveClass = (classId) => {
    setClasses(prevClasses => 
      prevClasses.map(clase => {
        if (clase.id === classId && clase.currentCapacity < clase.maxCapacity) {
          const reservedClass = classes.find(c => c.id === classId);
          setReservationMessage(`¡Reserva exitosa! Te has inscrito a ${reservedClass.name}`);
          
          setTimeout(() => setReservationMessage(''), 3000);
          
          return {
            ...clase,
            currentCapacity: clase.currentCapacity + 1
          };
        } else if (clase.id === classId && clase.currentCapacity >= clase.maxCapacity) {
          setReservationMessage('❌ Lo sentimos, esta clase está llena');
          setTimeout(() => setReservationMessage(''), 3000);
        }
        return clase;
      })
    );
  };

  // Calcular porcentaje de cupos disponibles
  const getCapacityPercentage = (current, max) => {
    return (current / max) * 100;
  };

  // Obtener color según capacidad
  const getCapacityColor = (current, max) => {
    const percentage = getCapacityPercentage(current, max);
    if (percentage >= 80) return 'var(--error)';
    if (percentage >= 60) return 'var(--warning)';
    return 'var(--success)';
  };

  // Categorías únicas para filtros
  const categories = ['todos', ...new Set(classes.map(clase => clase.category))];
  const difficulties = ['todos', ...new Set(classes.map(clase => clase.difficulty))];

  return (
    <section id="clases" className="classes-section">
      <div className="container">
        <div className="section-header">
          <h2>Nuestras Clases</h2>
          <p className="muted">Filtra, encuentra tu clase ideal y reserva tu cupo al instante.</p>
        </div>

        {/* Filtros */}
        <div className="filters">
          <div className="filter-group">
            <label htmlFor="category-filter">Categoría:</label>
            <select 
              id="category-filter"
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'todos' ? 'Todas las categorías' : 
                   category === 'cardio' ? 'Cardio' :
                   category === 'fuerza' ? 'Fuerza' :
                   category === 'flexibilidad' ? 'Flexibilidad' : category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="difficulty-filter">Dificultad:</label>
            <select 
              id="difficulty-filter"
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="filter-select"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty === 'todos' ? 'Todas las dificultades' : difficulty}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mensaje de reserva */}
        {reservationMessage && (
          <div className={`reservation-message ${reservationMessage.includes('❌') ? 'error' : 'success'}`}>
            {reservationMessage}
          </div>
        )}

        {/* Grid de Clases */}
        <div className="grid classes-grid">
          {filteredClasses.map(clase => (
            <article key={clase.id} className="card class-card">
              {/* Imagen de la clase */}
              <div className="class-image-container">
                <img 
                  src={clase.image} 
                  alt={clase.imageAlt}
                  className="class-image"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    e.target.src = '/images/class-placeholder.jpg';
                    e.target.alt = 'Imagen de clase no disponible';
                  }}
                />
                <div className="class-overlay">
                  <div className="badge class-id">{clase.id}</div>
                  <div className={`difficulty-badge ${clase.difficulty.toLowerCase()}`}>
                    {clase.difficulty}
                  </div>
                </div>
              </div>

              <div className="class-content">
                <h3>{clase.name}</h3>
                <p className="class-description muted">{clase.description}</p>
                
                <div className="class-details">
                  <div className="detail-item">
                    <span className="icon">⏱️</span>
                    <span>{clase.duration} min</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">👤</span>
                    <span>{clase.instructor}</span>
                  </div>
                  <div className="detail-item">
                    <span className="icon">📅</span>
                    <span>{clase.schedule}</span>
                  </div>
                </div>

                {/* Barra de progreso de capacidad */}
                <div className="capacity-section">
                  <div className="capacity-info">
                    <span>Cupos: {clase.currentCapacity}/{clase.maxCapacity}</span>
                    <span className="capacity-percentage">
                      ({Math.round(getCapacityPercentage(clase.currentCapacity, clase.maxCapacity))}%)
                    </span>
                  </div>
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill"
                      style={{
                        width: `${getCapacityPercentage(clase.currentCapacity, clase.maxCapacity)}%`,
                        backgroundColor: getCapacityColor(clase.currentCapacity, clase.maxCapacity)
                      }}
                    ></div>
                  </div>
                </div>

                <div className="class-actions">
                  <button 
                    className={`btn ${clase.currentCapacity >= clase.maxCapacity ? 'btn-disabled' : 'btn-primary'}`}
                    onClick={() => handleReserveClass(clase.id)}
                    disabled={clase.currentCapacity >= clase.maxCapacity}
                  >
                    {clase.currentCapacity >= clase.maxCapacity ? 'Cupo Lleno' : 'Reservar Cupo'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="no-results">
            <p>No se encontraron clases con los filtros seleccionados.</p>
            <button 
              className="btn ghost"
              onClick={() => {
                setSelectedCategory('todos');
                setSelectedDifficulty('todos');
              }}
            >
              Mostrar todas las clases
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Classes;