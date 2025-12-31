import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import { Link, useParams } from "react-router-dom";
import { FaClock, FaEye, FaLink, FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import Loader from "../components/Loader";

const Article = () => {
  const [articleData, setArticleData] = useState({});
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/articles/${id}`
        );
        const data = await res.json();
        setArticleData(data.data);
        console.log(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white">
      <Navbar />
      {loading ? <Loader text={"Loading Article..."}/> : (
        <main className="flex flex-col xl:flex-row justify-center items-start w-[90%] lg:w-[80%]">
          <article className="prose-none pb-10 pt-5 xl:pr-10">
            <Link
              to={articleData.original.source}
              className="text-blue-400 hover:underline bg-blue-100 px-5 py-2 rounded-[20px] inline-block mb-5"
            >
              <span className="font-extrabold">ORIGINAL ARTICLE: </span>
              {articleData.original.source}
            </Link>
            <h1 className="text-4xl font-extrabold mb-15">
              {" "}
              {articleData.updated.title}{" "}
            </h1>

            <div
              dangerouslySetInnerHTML={{ __html: articleData.updated.content }}
            />
          </article>

          <div className="w-[100%] lg:w-[350px] shrink-0 bg-slate-50 p-6 rounded-xl border border-slate-200 my-8 shadow-sm sticky top-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-5 flex items-center">
              <FaLink className="mr-2" /> Sources
            </h3>
            <ul className="list-disc space-y-4 pl-5">
              {articleData.citations.map((url) => (
                <li>
                  <Link
                    to={url}
                    className="text-blue-400 hover:underline break-all"
                  >
                    {url}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </main>
      )}
    </div>
  );
};

export default Article;
