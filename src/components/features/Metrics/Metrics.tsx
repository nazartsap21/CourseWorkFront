import './Metrics.scss';
import temperatureImage from '../../../assets/img/temperature.png';
import humidityImage from '../../../assets/img/humidity.png';
import ppmImage from '../../../assets/img/ppm.webp';

const Metrics = () => {
    return (
        <section className="metrics">
            <div className="metric">
                <img src={temperatureImage} alt="Temperature" />
                <p>Measures Temperature</p>
            </div>
            <div className="metric">
                <img src={humidityImage} alt="Humidity" />
                <p>Measures Humidity</p>
            </div>
            <div className="metric">
                <img src={ppmImage} alt="PPM" />
                <p>Measures PPM</p>
            </div>
        </section>
    );
};

export default Metrics;