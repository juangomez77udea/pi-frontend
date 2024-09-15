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

    return (
        <div className='container mx-72 my-72 text-sm'>
            <div className='text-center mb-6'>
                <h3 className='text-lg font-bold'>Insumos</h3>
                <div className='container ml-64'>
                        <Link
                            className="bg-green hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg ml-80"
                            to="/agregar"
                        >
                            Agregar Insumo
                        </Link>
                </div>
            </div>
            <div className='overflow-x-auto ml-56'>
                <table className='min-w-52 bg-white border border-gray-300'>
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
                                <td className='py-2 px-4 border-b'>{producto.inDate}</td>
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
                                <td className='py-2 px-4 border-b text-center'>
                                    <div className='flex justify-center gap-2'>
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
    );
}

export default ListadoProducto;
