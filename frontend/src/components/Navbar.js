import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

function Navbar() {
    const [isMobileView, setIsMobileView] = useState(false); 

    const handleMobileToggle = () => {
        setIsMobileView((prevState) => !prevState);
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                {/* Store Name */}
                <div className="text-white text-xl font-bold">
                    Bake My Cake
                </div>

                {/* Hamburger Icon for Mobile */}
                <div className="md:hidden">
                    <button
                        onClick={handleMobileToggle}
                        aria-label="Toggle Navigation"
                        className="text-white focus:outline-none"
                    >
                        {isMobileView ? <IoMdClose size={24} /> : <GiHamburgerMenu size={24} />}
                    </button>
                </div>

                {/* Navigation Links (Desktop) */}
                <ul className="hidden md:flex space-x-6 text-white font-medium">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "underline text-blue-300"
                                    : "hover:text-blue-300 transition-colors"
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                isActive
                                    ? "underline text-blue-300"
                                    : "hover:text-blue-300 transition-colors"
                            }
                        >
                            Signup
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "underline text-blue-300"
                                    : "hover:text-blue-300 transition-colors"
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Mobile Navigation Links */}
            {isMobileView && (
                <ul className="flex flex-col mt-4 space-y-2 text-white font-medium md:hidden">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? "underline text-blue-300"
                                    : "hover:text-blue-300 transition-colors"
                            }
                            onClick={handleMobileToggle}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/signup"
                            className={({ isActive }) =>
                                isActive
                                    ? "underline text-blue-300"
                                    : "hover:text-blue-300 transition-colors"
                            }
                            onClick={handleMobileToggle}
                        >
                            Signup
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive
                                    ? "underline text-blue-300"
                                    : "hover:text-blue-300 transition-colors"
                            }
                            onClick={handleMobileToggle}
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
