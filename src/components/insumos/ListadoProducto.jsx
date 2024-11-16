import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

const ListadoProducto = () => {
    const urlBase = "http://localhost:8080/fg-app/insumos";
    const [producto, setProducto] = useState([]);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar productos");
        setProducto(resultado.data);
    }

    const eliminarProducto = async (idProduct) => {
        await axios.delete(`${urlBase}/${idProduct}`);
        cargarProductos();
    }

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const year = date.getFullYear()
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}/${month}/${day}`;
    };

    return (
        <div className='flex flex-col items-center justify-start min-h-screen p-4 pt-24 lg:pt-32'>
            <div className='w-full max-w-6xl'>
                <div className='text-center mb-6'>
                    <h3 className='text-3xl font-bold mb-4'>Insumos</h3>
                    <Link
                        className="bg-blue_light hover:bg-blue_dark text-white font-bold py-2 px-4 rounded-lg"
                        to="/agregar"
                    >
                        Agregar Insumo
                    </Link>
                </div>
                <div className='overflow-x-auto shadow-md rounded-lg'>
                    <table className='w-full border-collapse bg-white text-sm'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='py-3 px-4 border-b'>Id</th>
                                <th className='py-3 px-4 border-b'>Fecha</th>
                                <th className='py-3 px-4 border-b'>Producto</th>
                                <th className='py-3 px-4 border-b'>Tipo</th>
                                <th className='py-3 px-4 border-b'>Presentación</th>
                                <th className='py-3 px-4 border-b'>Cantidad</th>
                                <th className='py-3 px-4 border-b'>Valor</th>
                                <th className='py-3 px-4 border-b'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {producto.map((producto, indice) => (
                                <tr key={indice} className="hover:bg-gray-100">
                                    <td className='py-2 px-4 border-b'>{producto.idProduct}</td>
                                    <td className='py-2 px-4 border-b'>{formatearFecha(producto.inDate)}</td>
                                    <td className='py-2 px-4 border-b'>{producto.name}</td>
                                    <td className='py-2 px-4 border-b'>{producto.type}</td>
                                    <td className='py-2 px-4 border-b'>{producto.presentation}</td>
                                    <td className='py-2 px-4 border-b'>{producto.quantity}</td>
                                    <td className='py-2 px-4 border-b'>
                                        <NumericFormat
                                            value={producto.price}
                                            displayType={'text'}
                                            thousandSeparator=','
                                            prefix={'$'}
                                            decimalScale={2}
                                            fixedDecimalScale
                                        />
                                    </td>
                                    <td className='py-2 px-4 border-b'>
                                        <div className='flex flex-col sm:flex-row justify-center gap-2'>
                                            <Link
                                                to={`/editar/${producto.idProduct}`}
                                                className='bg-yellow-400 text-white py-1 px-3 rounded text-sm hover:bg-yellow-500'
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => eliminarProducto(producto.idProduct)}
                                                className='bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600'
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListadoProducto;