
const Header = () => {
    return (
        <header className="bg-blue-900 fixed top-0 left-0 right-0 z-50">
            <nav className="mx-auto flex items-center justify-between p-10 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5 ml-auto">
                        <span className="sr-only">Fish Control</span>
                        <img className="h-auto w-auto right-1/4" src="/src/assets/2-removebg-preview.png" alt="" />
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header
