import React, { useState, useEffect } from 'react';
import PoundTable from './PoundTable';

const Cultivo = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [batchAge, setBatchAge] = useState('');
  const [tankType, setTankType] = useState(''); // Tipo de estanque
  const [quantityIn, setQuantityIn] = useState(0);
  const [quantityOut, setQuantityOut] = useState(0);
  const [averageWeightUnit, setAverageWeightUnit] = useState(0);
  const [averageWeightBatch, setAverageWeightBatch] = useState(0);

  const [pounds, setPounds] = useState([]);
  const [selectedPoundId, setSelectedPoundId] = useState('');

  // Función para calcular la edad del lote en días
  const calculateBatchAge = (dateIn) => {
    const currentDate = new Date();
    const loteDate = new Date(dateIn);
    const diffTime = Math.abs(currentDate - loteDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Función para obtener los lotes desde el backend
  const fetchBatches = () => {
    fetch('http://localhost:8080/fg-app/lotes')
      .then(response => response.json())
      .then(data => {
        setBatches(data);
      })
      .catch(error => {
        console.error('Error al obtener los lotes:', error);
      });
  };

  // Función para obtener los estanques desde el backend
  const fetchPounds = () => {
    fetch('http://localhost:8080/fg-app/estanques')
      .then(response => response.json())
      .then(data => {
        setPounds(data);
      })
      .catch(error => {
        console.error('Error al obtener los estanques:', error);
      });
  };

  // Obtener los lotes y estanques al montar el componente
  useEffect(() => {
    fetchBatches();
    fetchPounds();
  }, []);

  // Manejar el cambio de lote seleccionado
  const handleBatchChange = (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);
    const batch = batches.find(b => b.idBatch === parseInt(batchId));
    if (batch) {
      setSelectedDate(batch.dateIn);
      const age = calculateBatchAge(batch.dateIn);
      setBatchAge(age);
    } else {
      setSelectedDate('');
      setBatchAge('');
    }
  };

  // Restablecer el formulario después de guardar
  const resetForm = () => {
    setSelectedBatch('');
    setTankType('');
    setQuantityIn(0);
    setQuantityOut(0);
    setAverageWeightUnit(0);
    setAverageWeightBatch(0);
  };

  // Manejar el envío del formulario para agregar un estanque
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!selectedBatch || !tankType || quantityIn <= 0) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }
  
    // Validar que los valores sean numéricos
    const validQuantityIn = !isNaN(quantityIn) && quantityIn > 0;
    const validQuantityOut = !isNaN(quantityOut) && quantityOut >= 0;
    const validAverageWeightUnit = !isNaN(averageWeightUnit) && averageWeightUnit > 0;
  
    if (!validQuantityIn || !validQuantityOut || !validAverageWeightUnit) {
      alert("Por favor, ingrese valores válidos en los campos numéricos.");
      return;
    }
  
    const calculatedAverageWeightBatch = averageWeightUnit * quantityIn;
  
    const poundData = {
      idBatch: selectedBatch,
      datePound: new Date().toISOString().split('T')[0],
      poundType: tankType,
      quantityIn,
      quantityOut,
      averageWeightUnit,
      averageWeightBatch: calculatedAverageWeightBatch,
    };
  
    fetch('http://localhost:8080/fg-app/estanques', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(poundData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        console.log('Estanque guardado:', data);
        if (data.idPound) {
          console.log('ID generado:', data.idPound);  // Verifica si el ID fue generado
        } else {
          console.warn('ID no generado o nulo:', data);
        }
        // Restablecer el formulario y actualizar la lista de estanques
        resetForm();
        fetchPounds();
      })
      .catch(error => {
        console.error('Error al guardar el estanque:', error);
      });
  };

  // Manejar la eliminación de un estanque seleccionado
  const handleDelete = () => {
    if (!selectedPoundId) {
      alert("Por favor, seleccione un estanque para eliminar.");
      return;
    }
    
    if (!window.confirm("¿Está seguro de que desea eliminar este estanque?")) {
      return;
    }

    fetch(`http://localhost:8080/fg-app/estanques/${selectedPoundId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          alert("Estanque eliminado correctamente.");
          // Actualizar la lista de estanques y limpiar la selección
          fetchPounds();
          setSelectedPoundId('');
        } else {
          throw new Error('Error al eliminar el estanque.');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el estanque:', error);
        alert("Error al eliminar el estanque.");
      });
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen p-2 mt-5 text-sm'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Estanques</h1>
      <form onSubmit={handleSubmit} className='space-y-5 bg-white shadow p-6 rounded-lg w-full max-w-2xl'>
        <div className='grid grid-cols-2 gap-8'>
          <div className='flex items-center'>
            <label htmlFor="idBatch" className='block text-sm font-medium text-gray-900 w-1/3'>Lote:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-2/3"
              value={selectedBatch}
              onChange={handleBatchChange}
            >
              <option value="">Seleccione un Lote</option>
              {batches.map(batch => (
                <option key={batch.idBatch} value={batch.idBatch}>
                  {batch.idBatch}
                </option>
              ))}
            </select>
          </div>

          <div className='flex items-center'>
            <label htmlFor="dateIn" className='block text-sm font-medium text-gray-900 w-1/3'>Fecha:</label>
            <input
              id="dateIn"
              name="dateIn"
              type="date"
              className="border border-slate-400 p-2.5 rounded-lg w-2/3"
              value={selectedDate}
              readOnly
            />
          </div>

          <div className='flex items-center'>
            <label htmlFor="tankType" className='block text-sm font-medium text-gray-900 w-1/3'>Tipo de Estanque:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-2/3"
              value={tankType}
              onChange={(e) => setTankType(e.target.value)}
            >
              <option value="">Seleccione Tipo de estanque</option>
              <option value="Alevinaje">Alevinaje</option>
              <option value="Dedinos">Dedinos</option>
              <option value="Levante">Levante</option>
              <option value="Engorde">Engorde</option>
            </select>
          </div>

          <div className='flex items-center'>
            <label htmlFor="batchAge" className="block text-sm font-medium text-gray-900 w-1/3">Edad del Lote (días):</label>
            <input
              id="batchAge"
              name="batchAge"
              type="number"
              className="border border-slate-400 p-2.5 rounded-lg w-2/3"
              value={batchAge}
              readOnly
            />
          </div>

          <div className='flex items-center'>
            <label htmlFor="quantityIn" className="block text-sm font-medium text-gray-900 w-1/3">Cantidad de Ingreso:</label>
            <input
              id="quantityIn"
              name="quantityIn"
              type="number"
              className="border border-slate-400 p-2.5 rounded-lg w-2/3"
              value={quantityIn}
              onChange={(e) => setQuantityIn(parseInt(e.target.value))}
            />
          </div>

          <div className='flex items-center'>
            <label htmlFor="quantityOut" className="block text-sm font-medium text-gray-900 w-1/3">Cantidad de Salida:</label>
            <input
              id="quantityOut"
              name="quantityOut"
              type="number"
              className="border border-slate-400 p-2.5 rounded-lg w-2/3"
              value={quantityOut}
              onChange={(e) => setQuantityOut(parseInt(e.target.value))}
            />
          </div>

          <div className='flex items-center'>
            <label htmlFor="averageWeightUnit" className="block text-sm font-medium text-gray-900 w-1/3">Peso Promedio por Unidad:</label>
            <input
              id="averageWeightUnit"
              name="averageWeightUnit"
              type="number"
              className="border border-slate-400 p-2.5 rounded-lg w-2/3"
              value={averageWeightUnit}
              onChange={(e) => setAverageWeightUnit(parseInt(e.target.value))}
            />
          </div>

          <div className='flex items-center'>
            <label htmlFor="averageWeightBatch" className="block text-sm font-medium text-gray-900 w-1/3">Peso Promedio del Lote:</label>
            <input
              id="averageWeightBatch"
              name="averageWeightBatch"
              type="number"
              className="border border-slate-400 p-2.5 rounded-lg w-2/3"
              value={averageWeightBatch} // Este campo puede ser solo de lectura o eliminarse
              readOnly
            />
          </div>

        </div>
        <div className='mt-6 grid grid-cols-2 space-x-2'>
          <button
            type='submit'
            className='p-2 bg-blue_light hover:bg-blue_dark font-bold uppercase text-white rounded-lg'
          >
            Guardar Estanque
          </button>
          <button
            type='button'
            onClick={handleDelete}
            className='bg-red-500 hover:bg-red-600 font-bold uppercase text-white rounded-lg'
          >
            Eliminar Estanque
          </button>
        </div>
      </form>
      <div>
        <PoundTable
          pounds={pounds}
          selectedPoundId={selectedPoundId}
          onSelectPound={setSelectedPoundId}
        />
      </div>
    </div>
  );
};

export default Cultivo;
