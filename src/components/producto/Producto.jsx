import React from 'react'
import imagenes from '../../assets/imagenes'

const Producto = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen p-2 mt-10 overflow-hidden text-sm'>
        <h1>Estanques</h1>
        <img 
          src={imagenes.construccion} 
          alt="En construccion"
          className='w-80 h-80 rounded-full object-cover' 
        />
    </div>
  )
}

export default Producto
