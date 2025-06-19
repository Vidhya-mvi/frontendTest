import { useState } from "react";
import axios from "axios";
import "../index.css";

export default function CreateMenuModal({ onClose, onMenuCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDesc, setItemDesc] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  const handleAddItem = () => {
    if (itemName.trim() && itemPrice.trim() && itemDesc.trim()) {
      const newItem = {
        name: itemName.trim(),
        price: parseFloat(itemPrice.trim()),
        description: itemDesc.trim(),
      };
      setMenuItems((prevItems) => [...prevItems, newItem]);
      setItemName("");
      setItemPrice("");
      setItemDesc("");
    }
  };

  const handleRemoveItem = (index) => {
    setMenuItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let itemsToSend = [...menuItems];

 
    if (itemName.trim() && itemPrice.trim() && itemDesc.trim()) {
      itemsToSend.push({
        name: itemName.trim(),
        price: parseFloat(itemPrice.trim()),
        description: itemDesc.trim(),
      });
    }

    if (itemsToSend.length === 0) {
      alert("Please add at least one menu item.");
      return;
    }

    try {
      const res = await axios.post( "https://test-550b.onrender.com/api/menu", {
        data: {
          menu: {
            name: name.trim(),
            description: description.trim(),
          },
          selecteditems: itemsToSend,
        },
      });

      console.log("Menu created:", res.data);
      if (onMenuCreated) onMenuCreated();
      onClose();
    } catch (err) {
      console.error("Error creating menu:", err);
      alert("Failed to create menu. Check console for details.");
    }
  };


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>➕ Create New Menu</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Menu Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Menu Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="add-item-section">
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
            <input
              type="number"
              step="0.01"
              placeholder="Item Price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              required
            />
            <textarea
              placeholder="Item Description"
              value={itemDesc}
              onChange={(e) => setItemDesc(e.target.value)}
              required
            />
            <button
              type="button"
              className="add-item-btn"
              onClick={(e) => {
                e.preventDefault();
                handleAddItem();
              }}
            >
              Add Item
            </button>

          </div>

          <ul className="item-list">
            {menuItems.map((item, index) => (
              <li key={index}>
                <strong>{item.name}</strong> — ${item.price.toFixed(2)}
                <p>{item.description}</p>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="remove-item-btn"
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="button-group">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="create-btn">
              Create Menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
