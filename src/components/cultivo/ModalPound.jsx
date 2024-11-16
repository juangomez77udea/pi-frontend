import React, { useState, useEffect } from 'react';
import { toast } from 'react-toast';

const ModalPound = ({ pound, onClose, onUpdate }) => {
  const [feedingAmount, setFeedingAmount] = useState('');
  const [mortality, setMortality] = useState('');
  const [extraEvent, setExtraEvent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [remainingAnimals, setRemainingAnimals] = useState(pound.quantityIn);

  useEffect(() => {
    setRemainingAnimals(pound.quantityIn - parseInt(mortality || '0'));
  }, [mortality, pound.quantityIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/fg-app/registros', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pound: { idPound: pound.idPound },
          feedingAmount: parseInt(feedingAmount),
          mortality: parseInt(mortality),
          extraEvent,
          date,
          remainingAnimals,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar el registro');
      }

      const savedRegister = await response.json();
      toast.success('Registro guardado exitosamente');
      
      // Actualizar el estanque con la nueva cantidad de animales
      const updatedPound = {
        ...pound,
        quantityIn: remainingAnimals
      };
      onUpdate(updatedPound);
      onClose();
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al guardar el registro. Por favor, intente nuevamente.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Detalles del Estanque</h2>
        <p>Lote: {pound.idBatch}</p>
        <p>Estanque: {pound.occupedPound}</p>
        <p>Cantidad de animales: {remainingAnimals}</p>
        <p>Peso promedio: {pound.averageWeightUnit} g</p>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className='mb-4'>
            <label className='block mb-2'>Fecha: </label>
            <input 
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required 
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Alimentación (g):</label>
            <input
              type="number"
              value={feedingAmount}
              onChange={(e) => setFeedingAmount(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Mortalidad:</label>
            <input
              type="number"
              value={mortality}
              onChange={(e) => setMortality(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Evento extraordinario:</label>
            <textarea
              value={extraEvent}
              onChange={(e) => setExtraEvent(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalPound;