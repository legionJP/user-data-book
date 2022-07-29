import React from 'react';

function Navbar(props) {
    return (
        <div className="Navbar">
            <div className="right">
                <span>Logger</span>
            </div>
            <div className="left">
                <div className="left-login">
                    <span>Login</span>
                </div>
                <div className="left-signup">
                    <span>Signup</span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;