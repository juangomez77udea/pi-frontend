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
    const [isFormValid, setIsFormValid] = useState(false);

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

    useEffect(() => {
        const isValid =
            lote.amount !== '' &&
            lote.dateIn !== '' &&
            lote.batchAge !== '';
        setIsFormValid(isValid);
    }, [lote]);

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
        <div className='flex flex-col p-0 m-0 items-center justify-start min-h-screen lg:pt-32'>
            <h1 className="text-3xl font-bold text-center">Lotes</h1>
            <div className="w-full max-w-4xl">
                <form onSubmit={onSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="idBatch" className="block text-gray-700 text-sm font-bold mb-2">Número de Lote:</label>
                        <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
                            {lote.idBatch}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">Cantidad de animales:</label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingrese la cantidad de animales"
                            value={lote.amount}
                            onChange={onInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="dateIn" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Ingreso en la Granja:</label>
                        <input
                            id="dateIn"
                            name="dateIn"
                            type="date"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={lote.dateIn}
                            onChange={onInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="batchAge" className="block text-gray-700 text-sm font-bold mb-2">Edad del Lote:</label>
                        <input
                            id="batchAge"
                            name="batchAge"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingrese la edad del lote"
                            value={lote.batchAge}
                            onChange={onInputChange}
                            required
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row justify-end items-center space-y-2 sm:space-y-0 sm:space-x-2">
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-blue_light hover:bg-blue_dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            disabled={!isFormValid}
                        >
                            {selectedBatch ? 'Editar Lote' : 'Agregar Lote'}
                        </button>
                        <button
                            type="button"
                            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={eliminarLote}
                        >
                            Eliminar Lote
                        </button>
                    </div>
                </form>

                {selectedBatch && (
                    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 mb-4" role="alert">
                        <p className="font-bold">Lote seleccionado: {selectedBatch}</p>
                    </div>
                )}

                <div className="mt-8">
                    <BatchTable batch={batch} handleSelect={handleSelect} />
                </div>
            </div>
        </div>
    );
}

export default Lotes;