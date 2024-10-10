import React from 'react';

const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
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
            <table className="border-collapse border border-slate-500">
                <thead>
                    <tr>
                        <th className="border border-slate-600 bg-slate-400">Seleccionar</th>
                        <th className="border border-slate-600 bg-slate-400">Id</th>
                        <th className="border border-slate-600 bg-slate-400">Cantidad de Animales</th>
                        <th className="border border-slate-600 bg-slate-400">Fecha de Ingreso</th>
                        <th className="border border-slate-600 bg-slate-400">Edad del Lote</th>
                    </tr>
                </thead>
                <tbody>
                    {batch.length > 0 ? (
                        batch.map((lote) => (
                            <tr key={lote.idBatch}>
                                <td className="border border-slate-700">
                                    <input 
                                        type="radio" 
                                        name="batchSelect" 
                                        value={lote.idBatch} 
                                        checked={selectedBatchId === lote.idBatch} 
                                        onChange={() => handleRadioChange(lote.idBatch)} 
                                    />
                                </td>
                                <td className="border border-slate-700">{lote.idBatch}</td>
                                <td className="border border-slate-700">{lote.amount}</td>
                                <td className="border border-slate-700">{formatearFecha(lote.dateIn)}</td>
                                <td className="border border-slate-700">{lote.batchAge}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No hay lotes disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default BatchTable;
