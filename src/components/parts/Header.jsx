import { useState } from "react";
import { UserContext } from "../../context/UserContext";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import { UserCircleIcon, LogoutIcon } from "@heroicons/react/outline"
import Dropdown from "./Dropdown";
import instance from "../../axiosInstance";

const Header = () => {
  function logout() {
    const wantsLogout = window.confirm("Are you sure you want to log out?");
    if (wantsLogout) {
      instance.get("/api/logout")
      .then(() => window.location.reload())
      .catch(() => alert("An error occurred attempting to logout."))
    }
  }

  const [menuOpen, setMenuOpen] = useState(false);
  
  const links = [
    {name: "People", to: "/users"},
    {name: "All Models", to: "/models"},
    {name: "Upload Model", to: "/addModel"},
  ];

  return (
    <UserContext.Consumer>
      {(currentUser) => (
        <header className="bg-primarydark px-3 py-3 md:px-7 md:py-5 flex items-center">
          <Link to="/" height="20" className="hover:opacity-80 duration-200 inline-block text-white text-lg md:text-xl tracking-wide">
            <img src={logo} alt="Logo" width="55" loading="lazy" className="inline-block mr-5" />
            Model Masters
          </Link>
          {/* Medium+ Size Screen Menu */}
          <ul className="ml-auto hidden md:inline-block">
            {links.map((link, i) => (
              <li key={i} className="inline-block hover:opacity-80 duration-200 text-white font-serif px-5"><Link to={link.to}>{link.name}</Link></li>
            ))}
            <Dropdown
            items={[
              (currentUser.guest ? {} : {name: "Profile", to: "/user/" + currentUser._id}),
              (currentUser.guest ? {} : {name: "Settings", to: "/editAccount"}),
              {name: "Logout", onClick: logout, icon: LogoutIcon},
          
            ]}
            opener={() => <li className="inline-block text-white font-serif px-5"><Link to={(currentUser.guest ? "/" : "/user/" + currentUser._id)}><UserCircleIcon className="h-6 inline-block mr-2 relative -top-0.5" />{currentUser.firstName}</Link></li>} />
          </ul>
          {/* Small Size Screen Menu */ }
          <span className="inline-block md:hidden ml-auto">
            <Dropdown requireClick={true}
            items={[
              ...links,
              (currentUser.guest ? {} : {name: "My Profile", to: "/user/" + currentUser._id}),
              {name: "Logout", onClick: logout, icon: LogoutIcon},
            ]}
            opener={() => <li className="inline-block cursor-pointer pl-5 pr-2"><div className="w-10 h-0.5 bg-white mt-1.5"></div><div className="w-10 h-0.5 bg-white mt-1.5"></div><div className="w-10 h-0.5 bg-white mt-1.5"></div></li>} />
          </span>
        </header>
      )}
    </UserContext.Consumer>
  );
};

export default Header;
