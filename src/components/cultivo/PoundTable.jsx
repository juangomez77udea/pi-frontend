import React, { useState, useEffect } from 'react';


const PoundTable = () => {
  const [pounds, setPounds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const fetchPounds = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/fg-app/estanques');
      if (!response.ok) {
        throw new Error('Error al cargar los estanques');
      }
      const data = await response.json();
      console.log('Estanques cargados:', data);
      setPounds(data);
    } catch (error) {
      console.error('Error al cargar los estanques:', error);
      setError('Error al cargar los estanques. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPounds();
  }, []);

  if (isLoading) {
    return <div className="text-center mt-4">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-500 mt-4">{error}</div>;
  }

  return (
    <div className="w-full mt-8">
      <h2 className="text-2xl font-bold mb-4">Estanques Registrados</h2>
      <table className="w-full border-collapse border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-600 bg-slate-400 p-2">Lote</th>
            <th className="border border-slate-600 bg-slate-400 p-2">Estanque</th>
            <th className="border border-slate-600 bg-slate-400 p-2">Tipo</th>
            <th className="border border-slate-600 bg-slate-400 p-2">Fecha</th>
            <th className="border border-slate-600 bg-slate-400 p-2">Cantidad Ingreso</th>
            <th className="border border-slate-600 bg-slate-400 p-2">Acción</th>
          </tr>
        </thead>
        <tbody className=' text-center'>
          {pounds.map((pound) => (
            <tr key={pound.idPound}>
              <td className="border border-slate-700 p-2">{pound.idBatch}</td>
              <td className="border border-slate-700 p-2">{pound.occupedPound}</td>
              <td className="border border-slate-700 p-2">{pound.poundType}</td>
              <td className="border border-slate-700 p-2">{formatFecha(pound.datePound)}</td>
              <td className="border border-slate-700 p-2">{pound.quantityIn}</td>
              <td className="border border-slate-700 p-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    console.log('Ver detalles de:', pound);
                  }}
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pounds.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No hay estanques registrados.</p>
      )}
    </div>
  );
};

export default PoundTable;