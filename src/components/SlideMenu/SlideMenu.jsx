import { Link } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

const SlideMenu = () => {

    const { logout } = useAuth0();

    return (
        <div className="bg-perl min-h-screen w-80 fixed top-0 left-0 shadow-lg flex flex-col justify-center items-center space-y-0">

            <div className="w-full pt-60">
                <Link
                    to={'/insumos'}
                >
                    <button className="flex items-center justify-center w-full px-2 py-2 text-left border-t border-b border-orange mb-0 ml- text-blue_light hover:bg-green hover:text-perl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path fill="currentColor" d="m15.5 19.925l-4.25-4.25l1.4-1.4l2.85 2.85l5.65-5.65l1.4 1.4zM21 10h-2V5h-2v3H7V5H5v14h6v2H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h4.175q.275-.875 1.075-1.437T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5zm-9-5q.425 0 .713-.288T13 4t-.288-.712T12 3t-.712.288T11 4t.288.713T12 5"></path></svg>
                        <span className="ml-5 mr-5">Inventario</span>
                    </button>
                </Link>

                <Link
                    to={'/lotes'}
                >
                    <button className="flex items-center justify-center w-full px-2 py-2 text-left border-t border-b border-orange mb-0 ml- text-blue_light hover:bg-green hover:text-perl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16">
                            <g fill="none" stroke="#8aadf4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 15.5c-.7 0-1.5-.8-1.5-1.5V5c0-.7.8-1.5 1.5-1.5h9c.7 0 1.5.8 1.5 1.5v9c0 .7-.8 1.5-1.5 1.5z" />
                                <path d="m1.2 3.8l3.04-2.5S5.17.5 5.7.5h8.4c.66 0 1.4.73 1.4 1.4v7.73a2.7 2.7 0 0 1-.7 1.75l-2.68 3.51M3 8.5l3 2l-3 2" />
                            </g>
                        </svg>

                        <span className="ml-10 mr-12">Lotes</span>
                    </button>
                </Link>

                <Link
                    to={'/cultivo'}
                >
                    <button className="flex items-center justify-center w-full px-2 py-2 text-left border-t border-b border-orange mb-0 ml- text-blue_light hover:bg-green hover:text-perl">

                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 36 36"><circle cx="11.49" cy="17.5" r="1.5" fill="currentColor" /><path fill="currentColor" d="M33.48 9.29a1 1 0 0 0-1 0c-3.37 2-5.91 5.81-6.9 7.45L24.85 18l-1 1.62c-1.76 2.49-5.1 6.36-8.79 6.36c-4.65 0-8.75-6.15-9.84-7.94c1.09-1.79 5.18-7.94 9.84-7.94c3.54 0 6.77 3.58 8.58 6.07l.28-.48s.36-.51.93-1.25c-2.13-2.8-5.67-6.38-9.85-6.38c-6.59 0-11.67 9.07-11.88 9.46l-.23.48l.27.48c.21.39 5.29 9.46 11.88 9.46c5.06 0 9.22-5.34 11-8C26 20 27.18 18 27.18 18l.07-.11a18 18 0 0 1 1.88-2.75a20.3 20.3 0 0 1 2.86-3v11.74a21 21 0 0 1-3.61-4l-.16.26l-1 1.59a18.7 18.7 0 0 0 5.21 4.95a1 1 0 0 0 .5.14a1.1 1.1 0 0 0 .5-.13a1 1 0 0 0 .5-.87V10.16a1 1 0 0 0-.45-.87"></path></svg>
                        <span className="ml-9 mr-9">Cultivo</span>
                    </button>
                </Link>
                <Link
                    to={'/producto'}
                >
                    <button className="flex items-center justify-center w-full px-4 py-2 text-left border-t border-b border-orange mb-0 text-blue_light hover:bg-green hover:text-perl bolder">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 32 32"><path fill="currentColor" d="M20 21h-8a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2m-8-4v2h8v-2Z" /><path fill="currentColor" d="M28 4H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v16a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m-2 24H6V12h20Zm2-18H4V6h24z" /></svg>
                        <span className="ml-5 mr-5">Producto</span>
                    </button>
                </Link>
                <Link
                    to={'/estadistica'}
                >
                    <button className="flex items-center justify-center w-full px-4 py-2 text-left border-t border-b border-orange mb-0 ml-2 text-blue_light hover:bg-green hover:text-perl">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 26 26"><path fill="currentColor" d="M12.906-.031a1 1 0 0 0-.125.031A1 1 0 0 0 12 1v1H3a3 3 0 0 0-3 3v13c0 1.656 1.344 3 3 3h9v.375l-5.438 2.719a1.006 1.006 0 0 0 .875 1.812L12 23.625V24a1 1 0 1 0 2 0v-.375l4.563 2.281a1.006 1.006 0 0 0 .875-1.812L14 21.375V21h9c1.656 0 3-1.344 3-3V5a3 3 0 0 0-3-3h-9V1a1 1 0 0 0-1.094-1.031M2 5h22v13H2zm18.875 1a1 1 0 0 0-.594.281L17 9.563L14.719 7.28a1 1 0 0 0-1.594.219l-2.969 5.188l-1.219-3.063a1 1 0 0 0-1.656-.344l-3 3a1.016 1.016 0 1 0 1.439 1.44l1.906-1.906l1.438 3.562a1 1 0 0 0 1.812.125l3.344-5.844l2.062 2.063a1 1 0 0 0 1.438 0l4-4A1 1 0 0 0 20.875 6"></path></svg>
                        <span className="ml-5 mr-5">Estadísticas</span>
                    </button>
                </Link>
            </div>

            <div className="w-full pt-40">
                <Link
                    onClick={() => logout({ returnTo: window.location.origin })}
                >
                    <button className="flex items-center justify-center w-full px-4 py-2 text-left border-t border-b border-orange mt-6 text-blue_light hover:bg-green hover:text-perl">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />

                        </svg>
                        <span className="ml-5 mr-5">Salir</span>
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default SlideMenu
