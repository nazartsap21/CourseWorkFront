import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProfileServices from "../../../services/ProfileServices.ts";

const QRCodeHandlePage = () => {
    const { deviceId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const handleConnect = async () => {
            if (deviceId) {
                await ProfileServices.connectDevice(deviceId);
                navigate('/profile/device/' + deviceId);
            }
            else {
                navigate('/profile');
            }
        }
        handleConnect();
    }, [deviceId, navigate]);

    return <div>Redirecting...</div>;
};

export default QRCodeHandlePage;