import React, { useState, useEffect } from 'react';
import PoundTable from './PoundTable';

const Cultivo = () => {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [batchAge, setBatchAge] = useState('');
  const [tankType, setTankType] = useState('');
  const [quantityIn, setQuantityIn] = useState(0);
  const [quantityOut, setQuantityOut] = useState(0);
  const [averageWeightUnit, setAverageWeightUnit] = useState(0);
  const [averageWeightBatch, setAverageWeightBatch] = useState(0);
  const [pounds, setPounds] = useState([]);
  const [selectedPoundId, setSelectedPoundId] = useState('');
  const [error, setError] = useState('');
  const [selectedTankNumber, setSelectedTankNumber] = useState('');
  
  useEffect(() => {
    if (quantityIn > 0 && averageWeightUnit > 0) {
      const calculatedAverageWeightBatch = averageWeightUnit * quantityIn;
      setAverageWeightBatch(calculatedAverageWeightBatch);
    }
  }, [quantityIn, averageWeightUnit]);

  const getTankNumbers = () => {
    switch (tankType) {
      case 'Alevinaje':
        return ['A1', 'A2', 'A3', 'A4'];
      case 'Dedinos':
        return ['D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12'];
      case 'Levante':
        return ['L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21', 'L22'];
      case 'Engorde':
        return ['E23', 'E24', 'E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31', 'E32'];
      default:
        return [];
    }
  };

  const calculateBatchAge = (dateIn) => {
    const currentDate = new Date();
    const loteDate = new Date(dateIn);
    const diffTime = Math.abs(currentDate - loteDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const fetchBatches = () => {
    setError('');
    fetch('http://localhost:8080/fg-app/lotes')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los lotes');
        }
        return response.json();
      })
      .then(data => setBatches(data))
      .catch(error => {
        console.error('Error al obtener los lotes:', error);
        setError('Error al obtener los lotes. Por favor, inténtelo nuevamente.');
      });
  };

  const fetchPounds = () => {
    setError('');
    fetch('http://localhost:8080/fg-app/estanques')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los estanques');
        }
        return response.json();
      })
      .then(data => setPounds(data))
      .catch(error => {
        console.error('Error al obtener los estanques:', error);
        setError('Error al obtener los estanques. Por favor, inténtelo nuevamente.');
      });
  };

  useEffect(() => {
    fetchBatches();
    fetchPounds();
  }, []);

  const handleBatchChange = (e) => {
    const batchId = e.target.value;
    setSelectedBatch(batchId);
    const batch = batches.find(b => b.idBatch === parseInt(batchId));
  
    if (batch) {
      const dateIn = new Date(batch.dateIn);
      const adjustedDate = new Date(dateIn.getTime() - dateIn.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];
      
      setSelectedDate(adjustedDate);
      const age = calculateBatchAge(adjustedDate);
      setBatchAge(age);
    } else {
      setSelectedDate('');
      setBatchAge('');
    }
  };

  const resetForm = () => {
    setSelectedBatch('');
    setTankType('');
    setBatchAge(0);
    setQuantityIn(0);
    setQuantityOut(0);
    setAverageWeightUnit(0);
    setAverageWeightBatch(0);
    setSelectedTankNumber('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedBatch || !tankType || !selectedTankNumber || quantityIn <= 0) {
      alert("Por favor, complete todos los campos obligatorios.");
      return;
    }

    const validQuantityIn = !isNaN(quantityIn) && quantityIn > 0;
    const validQuantityOut = !isNaN(quantityOut) && quantityOut >= 0;
    const validAverageWeightUnit = !isNaN(averageWeightUnit) && averageWeightUnit > 0;

    if (!validQuantityIn || !validQuantityOut || !validAverageWeightUnit) {
      alert("Por favor, ingrese valores válidos en los campos numéricos.");
      return;
    }

    const calculatedAverageWeightBatch = averageWeightUnit * quantityIn;

    const poundData = {
      idBatch: parseInt(selectedBatch),
      datePound: new Date().toISOString().split('T')[0],
      poundType: tankType,
      occupedPound: selectedTankNumber,
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
        alert('Estanque guardado exitosamente');
        resetForm();
        fetchPounds();
      })
      .catch(error => {
        console.error('Error al guardar el estanque:', error);
        alert('Error al guardar el estanque. Por favor, intente nuevamente.');
      });
  };

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
      <h1 className='text-3xl font-bold mt-32 text-center'>Estanques</h1>
      {error && <p className="text-red-500">{error}</p>}
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
            <label htmlFor="tankNumber" className='block text-sm font-medium text-gray-900 w-1/3'>Número de Estanque:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-2/3"
              value={selectedTankNumber}
              onChange={(e) => setSelectedTankNumber(e.target.value)}
            >
              <option value="">Seleccione un número</option>
              {getTankNumbers().map(tankNumber => (
                <option key={tankNumber} value={tankNumber}>{tankNumber}</option>
              ))}
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
              value={averageWeightBatch}
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
          selectedTankNumber={selectedTankNumber}
        />
      </div>
    </div>
  );
};

export default Cultivo;