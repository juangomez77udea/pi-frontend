import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const date = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${date}`;
}

const EditarProducto = () => {
    const urlBase = "http://localhost:8080/fg-app/insumos";
    let navegacion = useNavigate();
    const { id } = useParams();

    const [producto, setProducto] = useState({
        name: "",
        InDate: getDate(),
        type: "",
        presentation: "",
        quantity: "",
        price: ""
    });

    const { name, InDate, type, presentation, quantity, price } = producto;

    useEffect(() => {
        cargarProducto();
    }, []);

    const cargarProducto = async () => {
        const resultado = await axios.get(`${urlBase}/${id}`);
        setProducto(resultado.data);
    };

    const onInputChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${urlBase}/${id}`, producto);
        navegacion('/insumos');
    };

    return (
        <div className='max-w-2xl mx-auto mt-36 p-6'>
            <div className='text-center mb-8'>
                <h3 className='text-2xl font-bold'>Editar Producto</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={name} 
                        onChange={onInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="InDate" className="block text-gray-700 font-medium">Fecha</label>
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
                    <label htmlFor="type" className="block text-gray-700 font-medium">Tipo</label>
                    <select 
                        id="type" 
                        name="type" 
                        value={type} 
                        onChange={onInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option></option>
                        <option>Alimento</option>
                        <option>Medicamento</option>
                        <option>Insumo</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="presentation" className="block text-gray-700 font-medium">Presentación</label>
                    <input 
                        type="text" 
                        id="presentation" 
                        name="presentation" 
                        value={presentation} 
                        onChange={onInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-gray-700 font-medium">Cantidad</label>
                    <input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        value={quantity} 
                        onChange={onInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 font-medium">Valor</label>
                    <input 
                        type="number" 
                        step="any" 
                        id="price" 
                        name="price" 
                        value={price} 
                        onChange={onInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className='text-center'>
                    <button 
                        type="submit" 
                        className="bg-yellow-400 text-white py-2 px-4 rounded hover:bg-yellow-500 mr-3"
                    >
                        Editar Producto
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
    );
};

export default EditarProducto;
