import { useEffect, useState, useRef, useCallback } from "react";
import VideoCard from "./VideoCard";
import Shimmer from "./Shimmer";

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);

  const observer = useRef();

  const lastVideoRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && nextPageToken) {
        fetchVideos(nextPageToken);
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, nextPageToken]);

  const fetchVideos = async (pageToken = "") => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=12&pageToken=${pageToken}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
      );

      const data = await response.json();

      const formattedVideos = data.items.map((video) => ({
        id: video.id,
        title: video.snippet.title,
        channel: video.snippet.channelTitle,
        thumbnail: video.snippet.thumbnails.high.url,
      }));

      setVideos((prev) => [...prev, ...formattedVideos]);
      setNextPageToken(data.nextPageToken);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="p-4 bg-black text-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {videos.map((video, index) => {
        if (videos.length === index + 1) {
          return (
            <div ref={lastVideoRef} key={video.id}>
              <VideoCard video={video} />
            </div>
          );
        } else {
          return <VideoCard key={video.id} video={video} />;
        }
      })}
      {loading && Array.from({ length: 4 }).map((_, i) => <Shimmer key={i} />)}
    </div>
  );
}