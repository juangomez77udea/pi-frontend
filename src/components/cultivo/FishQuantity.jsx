import React from 'react';

const FishQuantity = () => {
    return (
        <form className='space-y-5 bg-white shadow p-6 rounded-lg w-full max-w-2xl'>
            <h1 className='font-bold'>Cantidad de Animales</h1>

            <div className='grid grid-cols-2 gap-8'>
                <div className='flex items-center'>
                    <label htmlFor="fishQuantity" className="block text-sm font-medium text-gray-900 w-1/3">Entradas:</label>
                    <input
                        type="number"
                        className="border border-slate-400 p-2.5 rounded-lg w-2/3"
                        placeholder='####'
                    />
                </div>

                <div className='flex items-center'>
                    <label htmlFor="fishQuantity" className="block text-sm font-medium text-gray-900 w-1/3">Salidas:</label>
                    <input
                        type="number"
                        className="border border-slate-400 p-2.5 rounded-lg w-2/3"
                        placeholder='####'
                    />
                </div>
            </div>

            <h1 className='font-bold'>Peso</h1>

            <div className='grid grid-cols-2 gap-8'>
                <div className='flex items-center'>
                    <label htmlFor="fishWeight" className="block text-sm font-medium text-gray-900 w-1/3">Peso promedio / unidad:</label>
                    <input
                        type="number"
                        className="border border-slate-400 p-2.5 rounded-lg w-2/3"
                        placeholder='####'
                    />
                </div>

                <div className='flex items-center'>
                    <label htmlFor="fishWeight" className="block text-sm font-medium text-gray-900 w-1/3">Peso promedio / lote:</label>
                    <input
                        type="number"
                        className="border border-slate-400 p-2.5 rounded-lg w-2/3"
                        placeholder='####'
                    />
                </div>
            </div>
        </form>
    );
}

export default FishQuantity;
