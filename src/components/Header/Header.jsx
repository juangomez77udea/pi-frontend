import imagenes from "../../assets/imagenes";

const Header = () => {
  return (
    <header className="bg-blue-900 fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <span className="sr-only">Fish Control</span>
        </div>
        <div className="flex lg:flex-5 ml-auto">
          <img className="h-12 w-auto" src={imagenes.logo2} alt="Fish Control Logo" />
        </div>
      </nav>
    </header>
  );
};

export default Header;
