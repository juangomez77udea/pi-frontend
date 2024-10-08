import React from 'react';

const BatchTable = () => {
    return (
        <>
            <table className="border-collapse border border-slate-500 ">
                <thead>
                    <tr>
                        <th className="border border-slate-600 bg-slate-400">Id</th>
                        <th className="border border-slate-600 bg-slate-400">Cantidad de Animales</th>
                        <th className="border border-slate-600 bg-slate-400">Fecha de Ingreso</th>
                        <th className="border border-slate-600 bg-slate-400">Edad del Lote</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                        <td className="border border-slate-700 ...">LOREM</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default BatchTable;
