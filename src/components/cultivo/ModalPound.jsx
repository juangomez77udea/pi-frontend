import React from 'react';

const ModalPound = ({ pound, onClose }) => {
  if (!pound) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Detalles del Estanque</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Lote: {pound.idBatch}
            </p>
            <p className="text-sm text-gray-500">
              Estanque: {pound.occupedPound}
            </p>
            <p className="text-sm text-gray-500">
              Tipo: {pound.poundType}
            </p>
            <p className="text-sm text-gray-500">
              Fecha: {new Date(pound.datePound).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Cantidad Ingreso: {pound.quantityIn}
            </p>
            <p className="text-sm text-gray-500">
              Peso Promedio Unidad: {pound.averageWeightUnit}
            </p>
            <p className="text-sm text-gray-500">
              Peso Promedio Lote: {pound.averageWeightBatch}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalPound;