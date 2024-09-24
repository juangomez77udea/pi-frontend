import imagenes from "../../assets/imagenes";
import { useAuth0 } from "@auth0/auth0-react";

const LoginForm = () => {

    const { loginWithRedirect, isLoading } = useAuth0();

    if (isLoading) return <h1>Loading</h1>

    return (
        <div className="bg-login-bg bg-cover">
            <div className="flex justify-center items-center h-screen">
                <div className="bg-perl bg-opacity-90 p-8 rounded-lg">
                    <form className="flex flex-col items-center">
                        <div className="flex items-stretch mb-16">
                            <img className="w-40 h-40 mr-4" src={imagenes.logo1} alt="logo" />
                            <h1 className="font-black text-4xl mt-16 text-gray">Login</h1>
                        </div>

                        <div className="w-3/4">
                            <button
                                type="button"
                                onClick={() => loginWithRedirect()}
                                className="w-full justify-center rounded-xl bg-blue_light px-3 py-2 text-sm font-semibold leading-6 text-gray shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default LoginForm;
