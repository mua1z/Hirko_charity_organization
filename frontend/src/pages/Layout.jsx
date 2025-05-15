import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <nav
                style={{
                    padding: "1rem",
                    background: "#f5f5f5",
                    marginBottom: "2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                {/* Left side - Home */}
                <ul
                    style={{
                        display: "flex",
                        listStyle: "none",
                        margin: 0,
                        padding: 0
                    }}
                >
                    <li>
                        <Link
                            to="/Home"
                            style={{
                                fontWeight: location.pathname === "/Home" ? "bold" : "normal"
                            }}
                        >
                            Home
                        </Link>
                    </li>
                </ul>

                {/* Right side - Login/Register */}
                <ul
                    style={{
                        display: "flex",
                        gap: "1rem",
                        listStyle: "none",
                        margin: 0,
                        padding: 0
                    }}
                >
                    <li>
                        <Link
                            to="/login"
                            style={{
                                fontWeight: location.pathname === "/login" ? "bold" : "normal"
                            }}
                        >
                            Login
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/register"
                            style={{
                                fontWeight: location.pathname === "/register" ? "bold" : "normal"
                            }}
                        >
                            Register
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
