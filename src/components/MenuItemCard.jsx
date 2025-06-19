
import "../index.css";
export default function MenuItemCard({ item, onClick }) {
  return (
    <div
      className="border p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer bg-white"
      onClick={onClick}
    >
      <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{item.description}</p>
      <p className="text-green-600 font-medium mt-2">${item.price.toFixed(2)}</p>
    </div>
  );
}
