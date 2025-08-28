import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useRef, useCallback } from "react";
import Post from "@/components/Post";
import { BeatLoader } from "react-spinners";
import debounce from "lodash.debounce";

const Posts = () => {
  const supabase = createClient();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postNum, setPostNum] = useState({ min: 0, max: 9 });
  const [hasMore, setHasMore] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  const loadingRef = useRef(loading);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  const hasMoreRef = useRef(hasMore);
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const fetchPosts = useCallback(async () => {
    if (!hasMoreRef.current) return;
    setLoading(true);
    try {
      const { data: postsData, error } = await supabase
        .from("posts")
        .select(
          `
      *,
      author:profiles (
        full_name,
        avatar_url
      )
    `,
        )
        .range(postNum.min, postNum.min + 9)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...postsData]);
        if (postsData.length < 10) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [supabase, postNum.min]);

  useEffect(() => {
    if (postNum.min === 0 || hasMoreRef.current) {
      fetchPosts();
    }
  }, [fetchPosts]);

  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loadingRef.current &&
        hasMoreRef.current
      ) {
        setPostNum((prevPostNum) => ({
          min: prevPostNum.min + 10,
          max: prevPostNum.max + 10,
        }));
      }
    }, 200),
    [],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      handleScroll.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  if (initialLoading) {
    return <BeatLoader className="mx-auto my-10" />;
  }

  return (
    <div className="flex flex-col space-y-1">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      {loading && (
        <div className="flex justify-center items-center">
          <BeatLoader className="mx-auto my-10" />
        </div>
      )}
    </div>
  );
};

export default Posts;
