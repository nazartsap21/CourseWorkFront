import './Profile.scss';
import {FC} from "react";
import {useDispatch} from "react-redux";
import {logout} from "../../../store/authSlice.ts";
import AuthService from "../../../services/AuthService.ts";
import {useNavigate} from "react-router-dom";


interface ProfileProps {
    profile: {
        email: string;
        firstName: string;
        lastName: string;
    };
    devicesNumber: number;
}


const Profile: FC<ProfileProps> = ({profile, devicesNumber}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        dispatch(logout());
        await AuthService.logout();
        navigate('/login');
    };

    return (
        <div className="profile-details">
            <h1>Profile</h1>
            <p>Name: {profile.lastName} {profile.firstName}</p>
            <p>Email: {profile.email}</p>
            <p>Devices connected: {devicesNumber}</p>
            <hr/>
            <button className={"logout-button"} onClick={handleLogOut}>Log out</button>
        </div>
    );
};

export default Profile;