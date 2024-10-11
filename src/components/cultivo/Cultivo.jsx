import React from 'react';
import FishQuantity from './FishQuantity';

const Cultivo = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen p-2 mt-5 text-sm'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Estanques</h1>
      <form className='space-y-5 bg-white shadow p-6 rounded-lg w-full max-w-2xl'>
        <div className='grid grid-cols-2 gap-8'>
          
          <div className='flex items-center'>
            <label htmlFor="idTank" className='block text-sm font-medium text-gray-900 w-1/3'>Lote:</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-2/3">
              <option selected>Seleccione un Lote</option>
              <option>01</option>
              <option>02</option>
              <option>03</option>
              <option>04</option>
            </select>
          </div>

          <div className='flex items-center'>
            <label htmlFor="dateIn" className='block text-sm font-medium text-gray-900 w-1/3'>Fecha:</label>
            <input
              id="dateIn"
              name="dateIn"
              type="date"
              className="border border-slate-400 p-2.5 rounded-lg w-2/3"
            />
          </div>

          <div className='flex items-center'>
            <label htmlFor="tankType" className='block text-sm font-medium text-gray-900 w-1/3'>Tipo de Estanque:</label>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-2/3">
              <option selected>Tipo de estanque</option>
              <option>Alevinaje</option>
              <option>Dedinos</option>
              <option>Levante</option>
              <option>Engorde</option>
            </select>
          </div>

          <div className='flex items-center'>
            <label htmlFor="batchAge" className="block text-sm font-medium text-gray-900 w-1/3">Edad del Lote:</label>
            <input
              id="batchAge"
              name="batchAge"
              type="number"
              className="border border-slate-400 p-2.5 rounded-lg w-2/3"
              placeholder="Ingrese la edad del lote"
            />
          </div>
        </div>
      </form>
      <div className='mt-6'>
        <FishQuantity />
      </div>
    </div>
  );
}

export default Cultivo;
