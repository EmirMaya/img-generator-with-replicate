import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-28">
      <div className="max-w-7xl mx-auto flex flex-col py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <a
          href="https://github.com/Emir-A/img-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 text-center hover:text-gray-900"
        >
          GitHub
        </a>
        <p className="w-full text-center text-sm text-slate-400 border-t border-t-slate-400">
          copyright-2024-ai-generator
        </p>
      </div>
    </footer>
  );
};

export default Footer;
