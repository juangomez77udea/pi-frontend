import imagenes from "../../assets/imagenes";


const LoginForm = () => {
    return (
        <div className="bg-login-bg bg-cover">

        
        <div className="flex justify-center items-center h-screen">
            <div className="bg-perl bg-opacity-90 p-8 rounded-lg">
                <form className="flex flex-col items-center">
                    <div className="flex items-stretch mb-16">
                        <img className="w-40 h-40 mr-4" src={imagenes.logo1} alt="logo" />
                        <h1 className="font-black text-4xl mt-16 text-gray">Login</h1>
                    </div>

                    <div className="w-full mb-4">
                        <input
                            className="w-full p-2 border-b-2 border-orange text-gray"
                            type="text"
                            placeholder="Username"
                            required
                        />
                    </div>

                    <div className="w-full mb-4">
                        <input
                            className="w-full p-2 border-b-2 border-orange text-gray"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <div className="flex justify-between w-full mb-4">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Remember me
                        </label>
                        <a href="#" className="text-blue-500">Forgot password?</a>
                    </div>

                    <div className="w-3/4">
                        <button
                            type="submit"
                            className="w-full justify-center rounded-xl bg-blue_light px-3 py-2 text-sm font-semibold leading-6 text-gray shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>

        </div>
    );
}

export default LoginForm;
