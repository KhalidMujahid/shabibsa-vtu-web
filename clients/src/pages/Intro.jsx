import { useState, useEffect } from "react";
import shabibsadata from "../assets/shabibsadata.png";

function Intro() {
    const [isLoaded, setIsLoaded] = useState(false);

    const introDuration = 3000;

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, introDuration);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {!isLoaded && (
                <div
                    className={`fixed inset-0 flex flex-col justify-center items-center bg-white transition-opacity duration-1000 ${isLoaded ? "opacity-0" : "opacity-100"}`}
                >
                    {/* Logo */}
                    <div className="flex flex-col items-center">
                        <img
                            src={shabibsadata}
                            alt="Site Logo"
                            className="w-32 h-32 md:w-40 md:h-40 object-contain"
                        />
                        {/* Spinner */}
                        <div className="mt-4 border-4 border-gray-300 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
                    </div>

                    {/* Footer */}
                    <footer className="absolute bottom-4 w-full text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Home of VTU. All Rights Reserved.
                    </footer>
                </div>
            )}
        </>
    );
}

export default Intro;
