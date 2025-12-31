import React from "react";
import { Link } from "react-router-dom";
import ArticleBox from "../components/ArticleBox";

const Home = () => {
  return (
    <main>
      <div className="pb-[60px] relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-1 before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-50 pb-10">
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 px-5 py-2 rounded-full transition hover:border-gray-300 focus:outline-hidden focus:border-gray-300"
              href="#"
            >
              Built for the BeyondChats assignment
            </a>
          </div>

          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl">
              BeyondChats
              <span className="bg-clip-text bg-linear-to-tl from-blue-600 to-violet-600 text-transparent">
                {" "}
                Articles
              </span>
            </h1>
          </div>

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600">
              A curated collection of BeyondChats articles, enhanced using
              insights from top Google-ranked sources for improved SEO and
              clarity.
            </p>
          </div>

          <div className="mt-8 gap-3 flex justify-center flex-col sm:flex-row">
            <Link
              className="inline-flex justify-center items-center gap-x-3 text-center bg-linear-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-lg font-medium rounded-md focus:outline-hidden focus:from-violet-600 focus:to-blue-600 py-3 px-4"
              to="/articles"
            >
              Explore Articles
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
            <Link
              to="https://github.com/aayushsingh7/article-optimizer"
              className="relative cursor-pointer font-bold flex items-center justify-center px-10 py-3 gap-x-2 text-lg rounded-lg bg-gray-200 text-gray-800 shadow-2xs"
            >
              View Repository
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
