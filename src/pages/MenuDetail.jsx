import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MenuItemCard from "../components/MenuItemCard";
import "../index.css";

export default function MenuDetails() {
  const { id } = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      const res = await axios.get(` https://test-550b.onrender.com/api/menu/${id}`);
      setMenu(res.data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading menu...</p>;
  if (!menu) return <p className="text-center mt-10 text-red-500">Menu not found</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{menu.name}</h1>
        <p className="text-gray-600">{menu.description}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Items</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          onClick={() => alert("TODO: Open item modal")}
        >
          ➕ Add Item
        </button>
      </div>

      {menu.items.length === 0 ? (
        <p className="text-gray-500">No items yet. Add some!</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {menu.items.map((item) => (
            <MenuItemCard
              key={item._id}
              item={item}
              onClick={() => alert(`TODO: Show ${item.name} details`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
