import PropTypes from "prop-types";
import { useState } from "react";

const Header = ({ onSearch }) => {
  const [textSearch, setSearch] = useState("");

  // Hàm xử lý tìm kiếm
  const handleSearch = () => {
    if (textSearch.trim()) {
      onSearch(textSearch); // Gọi hàm onSearch nếu có từ khóa tìm kiếm
    } else {
      alert("No search term entered"); // Thông báo nếu không có từ khóa tìm kiếm
    }
  };

  return (
    <div className="p-4 bg-black flex items-center justify-between   ">
      <div className="flex items-center space-x-4">
        <h1 className="text-[30px] uppercase font-bold text-red-700">
          <a href="">Movie</a>
        </h1>
        <nav className="hidden sm:flex items-center space-x-4">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-5">
        <input
          id="search-input"
          type="text"
          placeholder="Search"
          className="p-2 w-[180px] sm:10 text-black rounded-lg "
          onChange={(e) => setSearch(e.target.value)} // Cập nhật state khi nhập liệu
          value={textSearch}
        />
        <button
          className="p-2 text-white bg-red-600 rounded-lg"
          onClick={handleSearch} // Gọi hàm handleSearch khi nhấn nút
        >
          Search
        </button>
      </div>
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired, // Đảm bảo onSearch là một hàm và được yêu cầu
};

export default Header;
