import React from "react";
import { Link } from "react-router-dom";

function Nav({ user, setUser }) {

    let homeLink = user ? "/protected-home" : "/";

    let linkTitle2 = user ? user.username : "Sign Up";
    let link2 = user ? "/profile" : "/sign-up";

    let linkTitle3 = user ? "logout" : "Sign In"
    let link3 = user ? "/" : "/sign-in"

    let logoutButton = user ? logout : () => { };

    function logout() {
        setUser(null)
        window.localStorage.removeItem("jwtToken")
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={styles.nav}>
            <div className="container-fluid">
                <Link className="navbar-brand" to={homeLink}>
                    Home
                </Link>
                <div className="navbar-expand" id="navbarNav">
                    <ul className="navbar-nav d-flex flex-row ">
                        <li className="nav-item">
                            <Link to={link2} className="nav-link">
                                {linkTitle2}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={link3}
                                className="nav-link"
                                onClick={() => logoutButton()}
                            >
                                {linkTitle3}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

const styles = {

    nav: {
        background: "linear-gradient(90deg, rgba(10,100,122,1) 0%, rgba(28,38,145,1) 50%, rgba(10,100,122,1) 100%)"
    },
}