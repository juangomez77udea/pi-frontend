import imagenes from '../../assets/imagenes'
import React from 'react'

const Estadisticas = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen p-2 mt-10 overflow-hidden text-sm'>
      <h1>Pagina Estadistica en construcción</h1>
      <img 
          src={imagenes.construccion} 
          alt="En construccion"
          className='w-80 h-80 rounded-full object-cover' 
        />
    </div>
  )
}

export default Estadisticas
