import { useNavigate } from "react-router-dom";

function VideoCard({ video }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        // Add to history
        const storedHistory = JSON.parse(localStorage.getItem("history")) || [];
        const existingIndex = storedHistory.findIndex(v => v.id === video.id);
        if (existingIndex > -1) {
          storedHistory.splice(existingIndex, 1); // Remove if exists to avoid duplicates
        }
        storedHistory.unshift(video); // Add to front
        localStorage.setItem("history", JSON.stringify(storedHistory.slice(0, 50))); // Limit to 50
        navigate(`/watch/${video.id}`);
      }}
      className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition duration-300 cursor-pointer"
    >
      <div className="w-full aspect-video bg-gray-800">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2">
          {video.title}
        </h3>
        <p className="text-white-400 text-xs mt-1">
          {video.channel}
        </p>
      </div>
    </div>
  );
}

export default VideoCard;