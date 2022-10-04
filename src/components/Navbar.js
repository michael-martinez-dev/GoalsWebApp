import React from "react";
import "./style/Navbar.css";

const Navbar = () => {
    function handleLogout() {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div className="navbar">
            <button className="sign-out-button" 
                    type="submit" 
                    onClick={handleLogout}>
                Sign Out
            </button>
            <h1>Welcome to {process.env.REACT_APP_NAME}</h1>

        </div>
    );
}

export default Navbar;
