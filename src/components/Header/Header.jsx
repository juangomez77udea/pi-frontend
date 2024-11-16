import imagenes from "../../assets/imagenes"

const Header = ({ toggleMenu }) => {
    return (
        <header className="bg-blue_dark fixed top-0 left-0 right-0 z-40">
            <nav className="mx-auto flex items-center justify-between p-4 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1 items-center">
                    <button
                        className="text-white lg:hidden mr-4"
                        onClick={toggleMenu}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <div className="flex items-center">
                        <img className="h-12 w-auto" src={imagenes.logo2} alt="Fish Control Logo" />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header