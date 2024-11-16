import React, { useState } from 'react';
import ModalPound from './ModalPound';

const PoundTable = ({ pounds, onPoundsChange, fetchPounds }) => {
  const [selectedPounds, setSelectedPounds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPound, setSelectedPound] = useState(null);

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleCheckboxChange = (poundId) => {
    setSelectedPounds(prevSelected => 
      prevSelected.includes(poundId)
        ? prevSelected.filter(id => id !== poundId)
        : [...prevSelected, poundId]
    );
  };

  const handleOpenModal = (pound) => {
    setSelectedPound(pound);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPound(null);
  };

  const handleUpdatePound = (updatedPound) => {
    onPoundsChange(prevPounds => 
      prevPounds.map(pound => 
        pound.idPound === updatedPound.idPound ? updatedPound : pound
      )
    );
  };

  const handleDelete = () => {
    if (selectedPounds.length === 0) {
      alert("Por favor, seleccione al menos un estanque para eliminar.");
      return;
    }

    if (!window.confirm(`¿Está seguro de que desea eliminar ${selectedPounds.length} estanque(s)?`)) {
      return;
    }

    Promise.all(selectedPounds.map(id => 
      fetch(`http://localhost:8080/fg-app/estanques/${id}`, { method: 'DELETE' })
    ))
      .then(responses => {
        if (responses.every(res => res.ok)) {
          alert("Estanques eliminados correctamente.");
          fetchPounds();
          setSelectedPounds([]);
        } else {
          throw new Error('Error al eliminar uno o más estanques.');
        }
      })
      .catch(error => {
        console.error('Error al eliminar estanques:', error);
        alert("Error al eliminar estanques.");
      });
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Estanques Registrados</h2>
      <div className="mb-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          disabled={selectedPounds.length === 0}
        >
          Eliminar Seleccionados
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Seleccionar</th>
            <th className="border p-2">Lote</th>
            <th className="border p-2">Estanque</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Fecha ingreso al Estanque</th>
            <th className="border p-2">Cantidad Ingreso</th>
            <th className="border p-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {pounds.map((pound) => (
            <tr 
              className='text-center' 
              key={pound.idPound}
            >
              <td className="border p-2">
                <input
                  type="checkbox"
                  checked={selectedPounds.includes(pound.idPound)}
                  onChange={() => handleCheckboxChange(pound.idPound)}
                />
              </td>
              <td className="border p-2">{pound.idBatch}</td>
              <td className="border p-2">{pound.occupedPound}</td>
              <td className="border p-2">{pound.poundType}</td>
              <td className="border p-2">{formatFecha(pound.datePound)}</td>
              <td className="border p-2">{pound.quantityIn}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={() => handleOpenModal(pound)}
                >
                  <p>Registrar</p>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pounds.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No hay estanques registrados.</p>
      )}
      {isModalOpen && (
        <ModalPound 
          pound={selectedPound} 
          onClose={handleCloseModal} 
          onUpdate={handleUpdatePound}
        />
      )}
    </div>
  );
};

export default PoundTable;