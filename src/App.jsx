/** @format */

// import { useEffect, useState } from "react";

// export default function App() {
//   const [videos, setVideos] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchVideos() {
//       try {
//         const response = await fetch(
//           `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&maxResults=30&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`
//         );

//         const data = await response.json();

//         const formattedVideos = data.items.map((video) => ({
//           id: video.id,
//           title: video.snippet.title,
//           channel: video.snippet.channelTitle,
//           thumbnail: video.snippet.thumbnails.high.url,
//         }));

//         setVideos(formattedVideos);
//       } catch (error) {
//         console.error("API Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchVideos();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Trending Videos</h1>

//       {loading ? (
//         <div className="animate-pulse">
//           <div className="bg-gray-300 h-6 w-64 mb-4"></div>
//           <div className="bg-gray-300 h-40 w-64 mb-4"></div>
//           <div className="bg-gray-300 h-6 w-48 mb-4"></div>
//         </div>
//       ) : (
//         videos.map((video) => (
//           <div key={video.id} style={{ marginBottom: "40px" }}>
//             <h3>{video.title}</h3>
// {/*
//             <img
//               // src={video.thumbnail}
//               // alt={video.title}
//               width="250"
//             /> */}

//             <p>{video.channel}</p>

//             {/* Individual iframe */}
//             <iframe
//               width="800"
//               height="450"
//               src={`https://www.youtube.com/embed/${video.id}`}
//               title="YouTube video player"
//               allowFullScreen
//             ></iframe>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./components/Feed";
import WatchPage from "./components/WatchPage";
import History from "./components/History";
import SearchFeed from "./components/SearchFeed";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
