import * as React from "react";
import { Link } from "react-router-dom";
import * as bootstrap from 'bootstrap';
import { useAuth } from "../context/AuthContext";


function NavBar(){

  const { logout, user } = useAuth();

  console.log(user);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">BadBank</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item" 
                    title="See what BadBank is all about!">
                        <Link className="nav-link container" to="/">Home</Link>
                    </li>
                    <li className="nav-item"
                    title="Make a new deposit!">
                        <Link className="nav-link container" to="/deposit">Deposit</Link>
                    </li>
                    <li className="nav-item"
                    title="Withdraw from your account!">
                        <Link className="nav-link container" to="/withdraw">Withdraw</Link>
                    </li>
                    <li className="nav-item"
                     title="These are all the users and user submissions!">
                        <Link className="nav-link container" to="/alldata">AllData</Link>
                    </li>
                </ul>
                <span className="navbar-text">
                | Welcome {user.displayName || user.email} <button onClick={handleLogout}>logout</button>
                </span>
            </div>
            </nav>
            
        </>
    );
}

export default NavBar;