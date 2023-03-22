import React from "react";

const Button = ({ handleClick, text, className, outlined = false }) => {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handleClick(e);
      }}
      className={`${className} ${outlined ? "text-teal-600 bg-white " : "bg-teal-600 text-white"
        } border-2  border-teal-600 font-semibold text-lg w-full px-4 py-2 rounded-lg shadow-lg`}
    >
      {text}
    </button>
  );
};

export default Button;
