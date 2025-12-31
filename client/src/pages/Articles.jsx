import React, { useEffect, useState } from "react";
import ArticleBox from "../components/ArticleBox";
import Navbar from "../layouts/Navbar";
import SearchInput from "../components/SearchInput";
import { useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";

const Articles = () => {
  const [articles, setArticles] = useState({});
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const query = params.get("query");

  useEffect(() => {
    const URL = query
      ? `${import.meta.env.VITE_API_URL}/articles/?query=${query}`
      : `${import.meta.env.VITE_API_URL}/articles`;
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setArticles(data.data);
        console.log(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [query]);

  return (
    <div className="w-full h-[100dvh] flex  flex-col items-center">
      <Navbar />
      <div className="w-[95%] lg:w-[80%] xl:w-[70%] h-[100dvh] mt-5">
        <SearchInput className="mb-[40px]" placeholder={"Search Articles"} />
        {loading ? (
          <Loader text="Loading Articles..." />
        ) : !loading && !articles.length ? (
          <div className="flex items-center justify-center h-[200px] font-bold text-lg">
            No Articles Found
          </div>
        ) : (
          articles.map((article) => <ArticleBox data={article} />)
        )}
      </div>
    </div>
  );
};

export default Articles;
