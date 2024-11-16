import React from 'react';

const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(1, '0');
    const day = date.getDate().toString().padStart(1, '0');
    return `${year}/${month}/${day}`;
};


const BatchTable = ({ batch, handleSelect }) => {
    const [selectedBatchId, setSelectedBatchId] = React.useState(null); 
    const handleRadioChange = (idBatch) => {
        setSelectedBatchId(idBatch);  
        handleSelect(idBatch);
    };

    return (
        <>
<div className="overflow-x-auto">
    <table className="w-full text-center border-collapse border border-slate-500">
        <thead>
            <tr className="bg-slate-400">
                <th className="border border-slate-600 p-3 font-semibold">Seleccionar</th>
                <th className="border border-slate-600 p-3 font-semibold">Id</th>
                <th className="border border-slate-600 p-3 font-semibold">Cantidad de Animales</th>
                <th className="border border-slate-600 p-3 font-semibold">Fecha de Ingreso</th>
                <th className="border border-slate-600 p-3 font-semibold">Edad del Lote</th>
            </tr>
        </thead>
        <tbody>
            {batch.length > 0 ? (
                batch.map((lote) => (
                    <tr key={lote.idBatch} className="hover:bg-slate-100">
                        <td className="border border-slate-700 p-3">
                            <input 
                                type="radio" 
                                name="batchSelect" 
                                value={lote.idBatch} 
                                checked={selectedBatchId === lote.idBatch} 
                                onChange={() => handleRadioChange(lote.idBatch)} 
                                className="form-radio h-5 w-5 text-blue-600"
                            />
                        </td>
                        <td className="border border-slate-700 p-3">{lote.idBatch}</td>
                        <td className="border border-slate-700 p-3">{lote.amount}</td>
                        <td className="border border-slate-700 p-3">{formatearFecha(lote.dateIn)}</td>
                        <td className="border border-slate-700 p-3">{lote.batchAge}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center p-3">No hay lotes disponibles</td>
                </tr>
            )}
        </tbody>
    </table>
</div>
        </>
    );
};

export default BatchTable;
