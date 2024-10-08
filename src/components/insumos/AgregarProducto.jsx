import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
}

const AgregarProducto = () => {
    const [producto, setProducto] = useState({
        name: '',
        InDate: getDate(),
        type: '',
        presentation: '',
        quantity: '',
        price: ''
    });
    const navigate = useNavigate();

    const { name, InDate, type, presentation, quantity, price } = producto;

    const onInputChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const urlBase = "http://localhost:8080/fg-app/insumos";
        await axios.post(urlBase, producto);
        navigate('/insumos');
    };

    return (
        <div className='flex items-center justify-center h-screen p-4 mt-10 overflow-hidden text-sm'>  
            <div className='max-w-md w-full bg-white p-6 border border-gray-300 rounded-md shadow-md'>
                <div className='text-center mb-6'>
                    <h3 className='text-xl font-bold'>Agregar Producto</h3>
                </div>
                <form onSubmit={onSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={name}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Nombre del producto'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="InDate" className="block text-gray-700">Fecha</label>
                        <input
                            type="date"
                            id="InDate"
                            name="InDate"
                            value={InDate}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="type" className="block text-gray-700">Tipo</label>
                        <select
                            id="type"
                            name="type"
                            value={type}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            
                        >
                            <option className=' placeholder-opacity-70'>Seleccione una Categoría</option>
                            <option>Alimento</option>
                            <option>Medicamento</option>
                            <option>Insumo</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="presentation" className="block text-gray-700">Presentación</label>
                        <input
                            type="text"
                            id="presentation"
                            name="presentation"
                            value={presentation}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Ingrese el peso por unidad de el/los insumos'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-gray-700">Cantidad</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Ingrese la cantidad'
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">Valor</label>
                        <input
                            type="number"
                            step="any"
                            id="price"
                            name="price"
                            value={price}
                            onChange={onInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='Ingrese el valor unitario'
                        />
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 mr-3"
                        >
                            Guardar
                        </button>
                        <a
                            href="/insumos"
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Regresar
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AgregarProducto;
