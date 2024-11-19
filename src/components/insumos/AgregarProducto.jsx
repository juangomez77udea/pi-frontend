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
        <div className='flex items-center justify-center min-h-screen p-4 bg-gray-100'>  
            <div className='w-full max-w-2xl bg-white p-8 rounded-lg shadow-md'>
                <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'>Agregar Producto</h2>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={name}
                                onChange={onInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Nombre del producto'
                            />
                        </div>
                        <div>
                            <label htmlFor="InDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                            <input
                                type="date"
                                id="InDate"
                                name="InDate"
                                value={InDate}
                                onChange={onInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                            <select
                                id="type"
                                name="type"
                                value={type}
                                onChange={onInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">Seleccione una Categoría</option>
                                <option>Alimento</option>
                                <option>Medicamento</option>
                                <option>Insumo</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="presentation" className="block text-sm font-medium text-gray-700 mb-1">Presentación</label>
                            <input
                                type="text"
                                id="presentation"
                                name="presentation"
                                value={presentation}
                                onChange={onInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Ingrese el peso por unidad'
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={quantity}
                                onChange={onInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Ingrese la cantidad'
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
                            <input
                                type="number"
                                step="any"
                                id="price"
                                name="price"
                                value={price}
                                onChange={onInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder='Ingrese el valor unitario'
                            />
                        </div>
                    </div>

                    <div className="flex justify-center space-x-4 mt-8">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
                        >
                            Guardar
                        </button>
                        <a
                            href="/insumos"
                            className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-300"
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