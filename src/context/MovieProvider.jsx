import { useState } from "react";
import { createContext } from "react";
import PropType from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

Modal.setAppElement("#root");

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const handleTrailer = async (id) => {
    setTrailerKey(""); // Đặt lại trailerKey trước khi bắt đầu
    try {
      // Sửa URL API: Thêm dấu gạch chéo giữa `${id}` và `videos`
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`; // Thử ngôn ngữ 'en-US' thay vì 'vi-US'
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const movieKey = await fetch(url, options);
      const data = await movieKey.json();
      console.log(data); // Kiểm tra dữ liệu trả về từ API

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
    <MovieContext.Provider value={handleTrailer}>
      {children}
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
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
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
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropType.node,
};

export { MovieProvider, MovieContext };
