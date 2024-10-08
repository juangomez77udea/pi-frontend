import BatchTable from "./BatchTable";


const Lotes = () => {
    return (

        <div className='flex items-center justify-center h-screen p-2 mt-10 overflow-hidden text-sm'>
            <form className=" space-y-5 bg-perl shadow p-10 rounded-lg">
                <div className="grid grid-cols-2 gap-3">
                    <label htmlFor="batch" className=" font-bold">Número de Lote:</label>
                    <input id="batch" type="text" className=" border border-slate-400 p-2 rounded-lg" placeholder="Ingrese el numero del lote" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <label htmlFor="quantity" className=" font-bold">Cantidad de animales:</label>
                    <input id="quantity" type="number" className=" border border-slate-400 p-2 rounded-lg" placeholder="Ingrese la canitdad de animales" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <label htmlFor="dateIn" className=" font-bold">Fecha de Ingreso en la Granja:</label>
                    <input id="dateIn" type="date" className=" border border-slate-400 p-2 rounded-lg" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <label htmlFor="age" className=" font-bold">Edad del Lote:</label>
                    <input id="age" type="number" className=" border border-slate-400 p-2 rounded-lg" placeholder="Ingrese el numero del lote" />
                </div>

                <div className=" grid grid-cols-3 space-x-3">

                    <button className="bg-blue_light hover:bg-blue_dark font-bold uppercase text-white rounded-lg">
                        Agregar Lote
                    </button>

                    <button className=" bg-green hover:bg-yellow-600 font-bold uppercase text-white rounded-lg">
                        Editar Lote
                    </button>

                    <button className=" bg-red-500 hover:bg-pink-400 font-bold uppercase text-white rounded-lg">
                        Editar Lote
                    </button>
                </div>

                <div className="grid grid-flow-row text-center">
                    <BatchTable/>
                </div>

            </form>
        </div>
    );
}

export default Lotes;
