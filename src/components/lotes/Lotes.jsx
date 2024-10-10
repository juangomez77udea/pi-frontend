import { useEffect, useState } from "react";
import BatchTable from "./BatchTable";
import axios from "axios";

const Lotes = () => {
    const urlBase = "http://localhost:8080/fg-app/lotes";

    const [lote, setLote] = useState({
        "idBatch": '',
        "amount": '',
        "dateIn": getDate(),
        "batchAge": ''
    });

    const [batch, setBatch] = useState([]);
    const [selectedBatch, setSelectedBatch] = useState(null);

    function getDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${date}`;
    }

    useEffect(() => {
        cargarLotes();
    }, []);

    const cargarLotes = async () => {
        const resultado = await axios.get(urlBase);
        setBatch(resultado.data);

    
        if (resultado.data.length > 0) {
            const ultimoLote = Math.max(...resultado.data.map(lote => lote.idBatch));
            setLote((prevLote) => ({
                ...prevLote,
                idBatch: ultimoLote + 1
            }));
        } else {
            setLote((prevLote) => ({
                ...prevLote,
                idBatch: 1
            }));
        }
    };

    const onInputChange = (e) => {
        setLote({ ...lote, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedBatch) {
                await axios.put(`${urlBase}/${selectedBatch}`, lote);
            } else {
                await axios.post(urlBase, lote);
            }
            cargarLotes();
            setLote({
                "idBatch": '',
                "amount": '',
                "dateIn": getDate(),
                "batchAge": ''
            });
            setSelectedBatch(null);
        } catch (error) {
            console.error("Error al agregar o editar el lote", error);
        }
    };

    const handleSelect = (idBatch) => {
        const loteSeleccionado = batch.find(lote => lote.idBatch === idBatch);
        setLote(loteSeleccionado);
        setSelectedBatch(idBatch);
        console.log(`Lote seleccionado: ${idBatch}`);
    };

    const eliminarLote = async () => {
        if (!selectedBatch) {
            console.log("No hay lote seleccionado para eliminar");
            return;
        }
        try {
            await axios.delete(`${urlBase}/${selectedBatch}`);
            cargarLotes();
            setLote({
                "idBatch": '',
                "amount": '',
                "dateIn": getDate(),
                "batchAge": ''
            });
            setSelectedBatch(null);
        } catch (error) {
            console.error("Error al eliminar el lote", error);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen p-2 mt-10 overflow-hidden text-sm'>
            <h1 className=" text-3xl font-bold mb-8 text-center">Lotes</h1>
            <form onSubmit={onSubmit} className="space-y-5 bg-perl shadow p-10 rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                    <label htmlFor="idBatch" className="font-bold">Número de Lote:</label>
                    <p className="border border-slate-400 p-2 rounded-lg bg-gray-100">
                        {lote.idBatch}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <label htmlFor="amount" className="font-bold">Cantidad de animales:</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        className="border border-slate-400 p-2 rounded-lg"
                        placeholder="Ingrese la cantidad de animales"
                        value={lote.amount}
                        onChange={onInputChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <label htmlFor="dateIn" className="font-bold">Fecha de Ingreso en la Granja:</label>
                    <input
                        id="dateIn"
                        name="dateIn"
                        type="date"
                        className="border border-slate-400 p-2 rounded-lg"
                        value={lote.dateIn}
                        onChange={onInputChange}
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <label htmlFor="batchAge" className="font-bold">Edad del Lote:</label>
                    <input
                        id="batchAge"
                        name="batchAge"
                        type="number"
                        className="border border-slate-400 p-2 rounded-lg"
                        placeholder="Ingrese la edad del lote"
                        value={lote.batchAge}
                        onChange={onInputChange}
                    />
                </div>

                <div className="grid grid-cols-2 space-x-2">
                    <button
                        type="submit"
                        className="bg-blue_light hover:bg-blue_dark font-bold uppercase text-white rounded-lg">
                        {selectedBatch ? 'Editar Lote' : 'Agregar Lote'}
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-red-600 font-bold uppercase text-white rounded-lg"
                        onClick={eliminarLote}
                    >
                        Eliminar Lote
                    </button>
                </div>

                <div className="grid grid-flow-row text-center">
                    {selectedBatch && (
                        <div className="grid grid-cols-1 p-2">
                            <p className=" text-xs p-2 font-semibold">Lote seleccionado: {selectedBatch}</p>
                        </div>
                    )}
                    <BatchTable batch={batch} handleSelect={handleSelect} />
                </div>
            </form>
        </div>
    );
}

export default Lotes;
