import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function WatchPage() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    async function fetchVideo() {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );

      const data = await response.json();
      const video = data.items[0];

      const formattedVideo = {
        id: video.id,
        title: video.snippet.title,
        thumbnail: video.snippet.thumbnails.high.url,
      };

      setVideoData(formattedVideo);

      // Save to history
      const history = JSON.parse(localStorage.getItem("history")) || [];

      // Remove duplicate if exists
      const filtered = history.filter((item) => item.id !== video.id);

      filtered.unshift(formattedVideo); // add new at top

      localStorage.setItem("history", JSON.stringify(filtered));
    }

    fetchVideo();
  }, [id]);

  return (
    <div className="p-6 flex flex-col items-center">
      <iframe
        width="800"
        height="450"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allowFullScreen
      ></iframe>

      {videoData && (
        <h2 className="mt-4 text-xl font-semibold">
          {videoData.title}
        </h2>
      )}
    </div>
  );
}