"use client";

import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const News = () => {
  const [news, setNews] = useState([]);
  const [articleNumber, setArticleNumber] = useState(3);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(
      `https://api.webz.io/newsApiLite?token=${process.env.NEXT_PUBLIC_NEWS_API_KEY}&q=Business`,
    )
      .then(
        async (res) =>
          await res.json().then((resObj) => setNews(resObj.posts || [])),
      )
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);
  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2">
      <h4 className="text-xl font-bold px-4">What&apos;s happening</h4>

      {loading ? (
        <div className="flex items-center justify-center pt-2">
          <BeatLoader color="#3495e5" margin={3} speedMultiplier={1} />
        </div>
      ) : (
        <div>
          {news
            ?.slice(0, articleNumber)
            .map(({ uuid, url, title, author, thread }) => (
              <a href={url} target="_blank" key={uuid}>
                <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-150 ease-in-out">
                  <div className="space-x-0.5">
                    <h6 className="text-sm font-bold">{title}</h6>
                    <p className="text-xs font-medium text-gray-500">
                      {author}
                    </p>
                  </div>
                  {thread.main_image && (
                    <img
                      src={thread.main_image}
                      alt={url}
                      className="rounded-xl"
                      width={70}
                    />
                  )}
                </div>
              </a>
            ))}
        </div>
      )}
      <button
        className="text-blue-400 text-sm pl-4 pb-3 hover:text-blue-500"
        onClick={() => setArticleNumber(articleNumber + 3)}
      >
        Show more
      </button>
    </div>
  );
};

export default News;
