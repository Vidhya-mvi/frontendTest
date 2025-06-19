import { useEffect, useState } from "react";
import axios from "axios";
import "../index.css";
import CreateMenuModal from "../components/CreateMenumodal";

import banner from "../assets/banner.png";
import banner2 from "../assets/banner(1).png";
import bgUnderTabs from "../assets/back.png";
import leftDrink from "../assets/img.png";
import rightDrink from "../assets/cocktail.png";
import frame from "../assets/Frame.png";
import frame2 from "../assets/Frame(1).png";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await axios.get(" https://test-1-5479.onrender.com/api/menu/all");
      let data = res.data;

      if (data.length === 0) {
        data = [
          { _id: "FOOD", name: "FOOD", menuItems: [] },
          { _id: "DRINKS", name: "DRINKS", menuItems: [] },
          { _id: "BRUNCH", name: "BRUNCH", menuItems: [] },
        ];
        setMenus(data);
        setActiveTab("FOOD");
        setMenuItems([]);
      } else {
        setMenus(data);
        const firstMenuId = data[0]._id;
        if (/^[a-f\d]{24}$/i.test(firstMenuId)) {
          setActiveTab(firstMenuId);
          fetchMenuItems(firstMenuId);
        } else {
          const matchedMenu = data.find(
            (menu) => menu.name.toLowerCase() === firstMenuId.toLowerCase() || menu._id === firstMenuId
          );
          if (matchedMenu) {
            setActiveTab(matchedMenu._id);
            fetchMenuItems(matchedMenu._id);
          } else {
            setActiveTab(firstMenuId);
            setMenuItems([]);
          }
        }
      }
    } catch (err) {
      console.error("Error fetching menus:", err);
    }
  };

  const fetchMenuItems = async (menuId) => {
    try {
      const res = await axios.get(`https://test-1-5479.onrender.com/api/menu/${menuId}`);
      setMenuItems(res.data.menuItems || []);
    } catch (err) {
      console.error("Error fetching menu items:", err);
    }
  };

  const handleTabClick = (name) => {
    const matchedMenu = menus.find(
      (menu) => menu.name.toLowerCase() === name.toLowerCase() || menu._id === name
    );
    if (matchedMenu) {
      setActiveTab(matchedMenu._id);
      fetchMenuItems(matchedMenu._id);
    }
  };

  const handleMenuCreated = () => {
    setShowModal(false);
    fetchMenus();
  };

  return (
    <div className="menu-page">
      {showModal && (
        <CreateMenuModal
          onClose={() => setShowModal(false)}
          onMenuCreated={handleMenuCreated}
        />
      )}

   
      <div className="menu-banner" style={{ backgroundImage: `url(${banner})` }}>
        <div className="banner-overlay">
          <h1 className="menu-title">MENU</h1>
          <p className="menu-subtitle">
            Please take a look at our menu featuring food, drinks, and brunch.
            If you'd like to place an order, use the "Order Online" button
            located below the menu.
          </p>
        </div>
      </div>

 
      <div className="bg-under-tabs" style={{ backgroundImage: `url(${bgUnderTabs})` }}>
        <div className="menu-tabs">
          {[...new Set(menus.map((menu) => menu.name.toUpperCase()))].map((name) => (
            <button
              key={name}
              className={`tab ${
                menus.find((m) => m._id === activeTab)?.name.toUpperCase() === name
                  ? "active"
                  : ""
              }`}
              onClick={() => handleTabClick(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-banner2" style={{ backgroundImage: `url(${banner2})` }}>
     

        <img src={frame} alt="Frame Left" className="menu-frame left" />
        <img src={leftDrink} alt="Left Drink" className="menu-drink left" />
        <div className="menu-section">
          <div className="menu-box enlarged-box">
            <h2 className="section-title">
              {menus.find((m) => m._id === activeTab)?.name.toUpperCase() || "MENU"} MENU
            </h2>

            <div className="menu-items">
              {menuItems.length > 0 ? (
                menuItems.map((item, index) => (
                  <div key={index} className="menu-item">
                    <div className="item-line">
                      <span className="item-name">{item.name}</span>
                      <span className="item-dots" />
                      <span className="item-price">{item.price}</span>
                    </div>
                    <p className="item-desc">{item.description}</p>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", opacity: 0.7 }}>No items in this menu.</p>
              )}
            </div>

            <div className="menu-actions">
              <button className="menu-btn" onClick={() => setShowModal(true)}>
                + Create Menu
              </button>
            </div>
          </div>
        </div>
        <img src={rightDrink} alt="Right Drink" className="menu-drink right" />
        <img src={frame2} alt="Frame Right" className="menu-frame right" />
      </div>
    </div>
  );
}