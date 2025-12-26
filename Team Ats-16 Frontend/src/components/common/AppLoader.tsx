import Lottie from "lottie-react";
import loaderAnimation from "../../../public/loading-animation.json";

const AppLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
            <Lottie
                animationData={loaderAnimation}
                loop
                autoplay
                className="w-40 h-40"
            />
            <p className="mt-2 text-lg font-semibold tracking-wide">
                <span className="text-green-600">Preparing</span>{" "}
                <span className="text-yellow-400">Experience</span>
            </p>
            <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-green-500 animate-pulse" />
        </div>
    );
};

export default AppLoader;
