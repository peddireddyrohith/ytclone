import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-black sticky top-0 z-50">
      
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="flex items-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
            alt="logo"
            height={45}
            width={45}
          />
          <span className="text-white font-bold text-xl ml-2">
            YouTube
          </span>
        </Link>

        {/* History Link */}
        <Link to="/history" className="text-white">
          History
        </Link>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-full flex items-center px-4 py-1 w-full max-w-md"
      >
        <input
          className="bg-transparent outline-none w-full text-black"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button type="submit" className="p-2 text-red-500">
          🔍
        </button>
      </form>

    </nav>
  );
}