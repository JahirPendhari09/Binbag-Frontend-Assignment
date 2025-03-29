import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <div className="flex items-center gap-10 w-full h-16 px-4 bg-blue-400 text-xl">
            <div className="text-left ml-4 text-white ">
                <Link to="/">Home</Link>
            </div>
            <div className="text-left ml-4 text-white ">
                <Link to="/">About</Link>
            </div>
            <div className="text-left ml-4 text-white ">
                <Link to="/">Services</Link>
            </div>
        </div>
    );
}

export { Navbar };
