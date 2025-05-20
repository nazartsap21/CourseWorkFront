import './Hero.scss';
import heroImage from '../../../assets/img/hero.webp';

const Hero = () => {
    return (
        <section className="hero">
            <h2>Discover the ultimate experience with our device</h2>
            <img src={ heroImage } alt="hero image" />
        </section>
    );
};

export default Hero;