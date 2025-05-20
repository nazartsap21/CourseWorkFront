import './Header.scss';
import {NavLink} from "react-router-dom";
import {RootState} from "../../../store/store.config.ts";
import {useSelector} from "react-redux";

const Header = () => {
    const auth = useSelector((state: RootState) => state.authReducer);

    return (
        <header>
            <NavLink
                to={'/'}
                className={'logo'}
            >
                CourseWork
            </NavLink>
            {auth.isAuth &&

                <div>
                    <NavLink
                        to={'/profile'}
                        className={({isActive}) => isActive ? 'active' : ''}
                    >
                        Profile
                    </NavLink>
                </div>
            }
            {!auth.isAuth &&
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