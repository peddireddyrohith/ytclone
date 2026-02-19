import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedHistory =
      JSON.parse(localStorage.getItem("history")) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Watch History</h1>

      {history.length === 0 ? (
        <p>No videos watched yet.</p>
      ) : (
        history.map((video) => (
          <div
            key={video.id}
            className="mb-6 cursor-pointer"
            onClick={() => navigate(`/watch/${video.id}`)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              width="300"
            />
            <h3 className="mt-2">{video.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}
