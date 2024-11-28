import { useState } from "react";
import PropType from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

Modal.setAppElement("#root"); // Đảm bảo Modal hoạt động đúng

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

const MovieSearch = ({ title, data }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (id) => {
    setTrailerKey(""); // Reset trailerKey trước khi bắt đầu
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`; // API để lấy trailer
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const movieKey = await fetch(url, options);
      const data = await movieKey.json();
      console.log(data); // Kiểm tra dữ liệu API trả về

      if (data.results && data.results.length > 0) {
        setTrailerKey(data.results[0].key); // Lấy trailer key đầu tiên
        setModalIsOpen(true); // Mở modal
      } else {
        alert("Không tìm thấy trailer cho bộ phim này.");
      }
    } catch (error) {
      setModalIsOpen(false);
      console.error(error);
      alert("Đã xảy ra lỗi khi tải trailer.");
    }
  };

  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className="w-[200px] h-[300px] relative group"
              onClick={() => handleTrailer(item.id)}
            >
              <div className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full cursor-pointer">
                <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
                <img
                  src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-2 ">
                  <p className="uppercase text-md">
                    {item.title || item.original_title}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            background: "rgba(0, 0, 0, 0.8)",
            zIndex: 9999,
          },
          content: {
            width: "80%", // Mặc định width cho màn hình nhỏ
            maxWidth: "60px", // Giới hạn kích thước tối đa cho modal
            height: "auto",
            maxHeight: "45%", // Giới hạn chiều cao modal
            margin: "auto",
            padding: "0", // Tắt padding của modal
          },
        }}
        contentLabel="Trailer Modal"
      >
        {trailerKey ? (
          <YouTube videoId={trailerKey} opts={opts} />
        ) : (
          <p>Loading trailer...</p>
        )}
      </Modal>
    </div>
  );
};

MovieSearch.propTypes = {
  title: PropType.string,
  data: PropType.array,
};

export default MovieSearch;
