import React from 'react';
import { Link } from 'react-router-dom'

function NavBar(props) {
    return (
        <nav className='navbar navbar-expand-sm navbar-dark bg-info mb-0 py-0'>
            <div className='container'>
                <Link className="navbar-brand" to={'/'}>Do Stuff Abroad</Link>
                <Link className='navbar-nav mr-auto nav-item nav-link' to={'#'}>Add Chat Group</Link>
                <Link className='navbar-nav mr-auto nav-item nav-link' to={'/login'}>Login</Link>
            </div>
        </nav>
    )
}

export default NavBar;