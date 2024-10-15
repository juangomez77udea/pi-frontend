import React from 'react';

const PoundTable = ({ pounds, selectedPoundId, onSelectPound }) => {

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString();
  };

  return (
    <table className="border-collapse border border-slate-500 text-center w-full mt-8">
      <thead>
        <tr>
          <th className="border border-slate-600 bg-slate-400">Seleccionar</th>
          <th className="border border-slate-600 bg-slate-400">Id Estanque</th>
          <th className="border border-slate-600 bg-slate-400">Id Lote</th>
          <th className="border border-slate-600 bg-slate-400">Ingresos</th>
          <th className="border border-slate-600 bg-slate-400">Egresos</th>
          <th className="border border-slate-600 bg-slate-400">Fecha de Estanque</th>
          <th className="border border-slate-600 bg-slate-400">Tipo de Estanque</th>
          <th className="border border-slate-600 bg-slate-400">Peso Promedio Unitario</th>
          <th className="border border-slate-600 bg-slate-400">Peso Promedio del Lote</th>
        </tr>
      </thead>
      <tbody>
        {pounds.length > 0 ? (
          pounds.map((pound) => (
            <tr key={pound.idPound}>
              <td className="border border-slate-700">
                <input
                  type="radio"
                  name="selectedPound"
                  value={pound.idPound}
                  checked={selectedPoundId === pound.idPound}
                  onChange={() => onSelectPound(pound.idPound)}
                />
              </td>
              <td className="border border-slate-700">{pound.idPound}</td>
              <td className="border border-slate-700">{pound.idBatch}</td>
              <td className="border border-slate-700">{pound.quantityIn}</td>
              <td className="border border-slate-700">{pound.quantityOut}</td>
              <td className="border border-slate-700">{formatFecha(pound.datePound)}</td>
              <td className="border border-slate-700">{pound.poundType}</td>
              <td className="border border-slate-700">{pound.averageWeightUnit}</td>
              <td className="border border-slate-700">{pound.averageWeightBatch}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="9" className="text-center">No hay estanques disponibles</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default PoundTable;
