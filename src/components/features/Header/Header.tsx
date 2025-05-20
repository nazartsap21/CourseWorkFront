import React, {useState} from 'react';
import './Header.scss';
import {NavLink} from "react-router-dom";

const Header = () => {
    const [isAuth, setIsAuth] = useState(true);

    return (
        <header>
            <NavLink
                to={'/'}
                className={'logo'}
            >
                CourseWork
            </NavLink>
            {isAuth &&

                <div>
                    <NavLink
                        to={'/profile'}
                        className={({isActive}) => isActive ? 'active' : ''}
                    >
                        Profile
                    </NavLink>
                </div>
            }
            {!isAuth &&
                <div>
                    <NavLink
                        to={'/login'}
                        className={({isActive}) => isActive ? 'active' : ''}
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to={'/register'}
                        className={({isActive}) => isActive ? 'active' : ''}
                    >
                        Register
                    </NavLink>
                </div>
            }
        </header>
    );
};

export default Header;