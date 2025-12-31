import React, { useState } from "react";
import { FaClock, FaEye, FaUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

const ArticleBox = ({data}) => {
  const [showOriginal,setShowOriginal] = useState(false)
  return (
   <Link to={`/articles/${data._id}`}>
    <figure className="flex flex-col md:flex-row border-blue-100 border-2 rounded-2xl mb-3 overflow-hidden">
      <div className="w-full md:w-[350px] shrink-0 relative">
        <button onClick={(e)=> {e.stopPropagation();e.preventDefault();setShowOriginal(!showOriginal)}} className="absolute top-0 left-0 px-[10px] py-[10px] text-sm font-bold text-white bg-blue-400 rounded-br-[15px]">{showOriginal ? "Show Updated" : "Show Original"}</button>
        <img
          src={data.thumbnail}
          className="w-full h-[220px] md:h-full object-cover"
        />
      </div>

      <figcaption className="p-4 md:p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-lg md:text-2xl mb-3 line-clamp-1">
            {showOriginal ? data.original.title : data.updated.title}
          </h3>
          <p className="text-gray-600 text-sm md:text-lg line-clamp-2">
           {showOriginal ? data.original.excerpt : data.updated.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap items-center mt-4 gap-3 text-gray-600">
          <div className="flex items-center">
            <FaUser className="mr-1 text-sm md:text-base" />
            <span className="text-sm md:text-base">Gemini</span>
          </div>

          <GoDotFill className="text-xs text-gray-400" />

          <div className="flex items-center">
            <FaClock className="mr-1 text-sm md:text-base" />
            <span className="text-sm md:text-base">{formatDate(data.createdAt)}</span>
          </div>
          
        </div>
      </figcaption>
    </figure>
    </Link>
  );
};

export default ArticleBox;
