import React, { useState } from 'react'
import imagenes from '../../assets/imagenes'

const Producto = () => {
  const [selectedPond, setSelectedPond] = useState('')

  // Datos de ejemplo para los estanques
  const ponds = [
    { id: 1, name: 'Estanque A1' },
    { id: 2, name: 'Estanque A2' },
    { id: 3, name: 'Estanque A3' },
    { id: 4, name: 'Estanque A4' },
  ]

  return (
    <div className='w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Producto</h1>
      
      <form className="space-y-4">

      <div className='flex items-center space-x-4'>
          <label htmlFor="date" className='block text-sm font-medium text-gray-700 w-1/3'>Fecha:</label>
          <input 
            type="date" 
            id="date" 
            className="mt-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className='flex items-center space-x-4'>
          <label htmlFor="pond" className='block text-sm font-medium text-gray-700 w-1/3'>Estanque:</label>
          <select 
            id="pond"
            value={selectedPond}
            onChange={(e) => setSelectedPond(e.target.value)}
            className="mt-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Seleccione un estanque</option>
            {ponds.map((pond) => (
              <option key={pond.id} value={pond.id}>{pond.name}</option>
            ))}
          </select>
        </div>

        <div className='flex items-center space-x-4'>
          <label htmlFor="biomass" className='block text-sm font-medium text-gray-700 w-1/3'>Biomasa:</label>
          <input 
            type="text" 
            id="biomass" 
            className="mt-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese la biomasa"
          />
        </div>

        <div className='flex items-center space-x-4'>
          <label htmlFor="estimatedProduction" className='block text-sm font-medium text-gray-700 w-1/3'>Producción estimada en Kg.:</label>
          <input 
            type="text" 
            id="estimatedProduction" 
            className="mt-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese la producción estimada"
          />
        </div>

        <div className='flex items-center space-x-4'>
          <label htmlFor="timeFromEntry" className='block text-sm font-medium text-gray-700 w-1/3'>Tiempo desde ingreso:</label>
          <input 
            type="text" 
            id="timeFromEntry" 
            className="mt-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese el tiempo desde ingreso"
          />
        </div>

        <div className='flex items-center space-x-4'>
          <label htmlFor="mortalityPercentage" className='block text-sm font-medium text-gray-700 w-1/3'>% Mortalidad:</label>
          <input 
            type="text" 
            id="mortalityPercentage" 
            className="mt-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese el porcentaje de mortalidad"
          />
        </div>

        <div className='flex items-center space-x-4'>
          <label htmlFor="feedConversion" className='block text-sm font-medium text-gray-700 w-1/3'>Conversión Alimenticia:</label>
          <input 
            type="text" 
            id="feedConversion" 
            className="mt-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese la conversión alimenticia"
          />
        </div>

        <div className='flex items-center space-x-4'>
          <label htmlFor="oxygenConsumption" className='block text-sm font-medium text-gray-700 w-1/3'>Consumo aprox. O2:</label>
          <input 
            type="text" 
            id="oxygenConsumption" 
            className="mt-1 block w-2/3 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Ingrese el consumo aproximado de O2"
          />
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Acción
          </button>
        </div>
      </form>
    </div>
  )
}

export default Producto