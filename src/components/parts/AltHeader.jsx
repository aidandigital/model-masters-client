import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";

// This is a stateless header.

const AltHeader = () => (
    <header className="bg-primarydark px-3 py-3 md:px-7 md:py-5 flex items-center">
        <Link to="/" height="20" className="hover:opacity-80 duration-200 inline-block text-white text-lg md:text-xl tracking-wide">
            <img src={logo} alt="Logo" width="55" loading="lazy" className="inline-block mr-5" />
            Model Masters
        </Link>
    </header>
);

export default AltHeader;