import bannerImg from '../assets/banner.png'; 
import '../index.css'; 

export default function Home() {
  return (
    <div className="home-page">
      <div className="banner-image-wrapper">
        <img src={bannerImg} alt="Banner" className="banner-image" />

        <div className="banner-overlay">
          <h1 className="menu-title">WELCOME</h1>
          <p className="menu-subtitle">
            Discover our delicious menu, crafted to delight. Start by browsing our featured categories — food, drinks, and brunch.
          </p>
        </div>
      </div>

    </div>
  );
}
