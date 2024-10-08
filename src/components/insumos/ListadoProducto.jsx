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
        <div className='flex items-center justify-center h-screen p-8 mt-10 overflow-hidden text-sm'>
            <div className='container mx-72 my-72 text-sm'>
                <div className='text-center mb-6 grid grid-cols-2'>
                    <h3 className='text-lg font-bold'>Insumos</h3>
                    <div className='container ml-60'>
                        <Link
                            className=" bg-blue_light hover:bg-blue_dark text-white font-bold py-2 px-2 rounded-lg"
                            to="/agregar"
                        >
                            Agregar Insumo
                        </Link>
                    </div>
                </div>
                <div className='overflow-x-auto ml-56'>
                    <table className=' border-collapse border border-slate-500 min-w-52 bg-white caption-top text-center'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='py-3 px-4 border border-slate-600 bg-slate-400'>Id</th>
                                <th className='py-3 px-4 border border-slate-600 bg-slate-400'>Fecha</th>
                                <th className='py-3 px-4 border border-slate-600 bg-slate-400'>Producto</th>
                                <th className='py-3 px-4 border border-slate-600 bg-slate-400'>Tipo</th>
                                <th className='py-3 px-4 border border-slate-600 bg-slate-400'>Presentación</th>
                                <th className='py-3 px-4 border border-slate-600 bg-slate-400'>Cantidad</th>
                                <th className='py-3 px-4 border border-slate-600 bg-slate-400'>Valor</th>
                                <th className='py-3 px-4 border border-slate-600 bg-slate-400'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {producto.map((producto, indice) => (
                                <tr key={indice} className="hover:bg-gray-100">
                                    <td className='py-2 px-4 border border-slate-600'>{producto.idProduct}</td>
                                    <td className='py-2 px-4 border border-slate-600'>{formatearFecha(producto.inDate)}</td>
                                    <td className='py-2 px-4 border border-slate-600'>{producto.name}</td>
                                    <td className='py-2 px-4 border border-slate-600'>{producto.type}</td>
                                    <td className='py-2 px-4 border border-slate-600'>{producto.presentation}</td>
                                    <td className='py-2 px-4 border border-slate-600'>{producto.quantity}</td>
                                    <td className='py-2 px-4 border border-slate-600'>
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
        </div>
    );
}

export default ListadoProducto;
