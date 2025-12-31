import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchInput = ({ className, placeholder }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  return (
    <div className={`w-full ${className}`}>
      <div className="relative">
        <input
          onKeyDown={(e)=> e.key === "Enter" &&  navigate(text.length ? `/articles?query=${encodeURIComponent(text)}` : "/articles")}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-200 rounded-md pl-3 pr-28 py-4 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder={placeholder}
        />
        <button
          className="rounded-[10px] absolute h-full top-0 right-0 flex items-center rounded bg-slate-800 py-1 px-4 border border-transparent text-center text-lg text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          onClick={() => navigate(text.length ? `/articles?query=${encodeURIComponent(text)}` : "/articles")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
