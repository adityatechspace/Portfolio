import { useState, useEffect } from "react";
import {
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
  FiDownload,
} from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import { useTheme } from "../../context/ThemeContext";
import { useAIAssistant } from "../../context/AIAssistantContext";
import { FiLock } from "react-icons/fi";

function Navbar({ data }) {
  const { darkMode, toggleTheme } = useTheme();
  const { openAI } = useAIAssistant();
  const [menuOpen, setMenuOpen] = useState(false);
  const [highlightAI, setHighlightAI] = useState(false);
    const [showThemeMessage, setShowThemeMessage] = useState(false);


  const { navLinks = [], navigation = {}, buttons = {} } = data || {};
  const { resume, aiAssistant } = buttons;

    const handleThemeClick = () => {
    setShowThemeMessage(true);

    setTimeout(() => {
      setShowThemeMessage(false);
    }, 4000);
  };


  useEffect(() => {
  const hasSeenHint = localStorage.getItem("seen-ai-hint");

  if (!hasSeenHint) {
    setHighlightAI(true);

    setTimeout(() => {
      setHighlightAI(false);
      localStorage.setItem("seen-ai-hint", "true");
    }, 6000);
  }

}, []);


  return (
    <>
     <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl">
         <div className="absolute bottom-20 h-[350px] w-[350px] rounded-full bg-blue-500/10 blur-[120px]"></div>

  <div className="rounded-full border border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-xl">

    <div className="px-1 py-1 h-15 flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                <img src= {navigation.logo} alt="Portfolio logo"/>
              </div>

              <div className="hidden sm:block">
                <h1 className="font-semibold text-black dark:text-white">
                  {navigation.title}
                </h1>

                <p className="text-xs text-slate-500">
                  {navigation.subtitle}
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7">

              {navLinks.map((item) => (
                <a
                  key={item.text}
                  href={`#${item.link}`}
                  className="relative text-sm font-medium text-slate-700 dark:text-slate-300 transition hover:text-blue-500 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all hover:after:w-full"
                >
                  {item.text}
                </a>
              ))}
              
              {/* AI Assistant */}
              <button
  type="button"
  onClick={openAI}
  className={`group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-500
  ${
    highlightAI
      ? "border border-violet-400 bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-200 shadow-lg shadow-violet-500/30 animate-pulse"
      : "border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 text-violet-300 hover:scale-105 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20"
  }`}
>
  {aiAssistant.text}

  {highlightAI && (
    <span className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-white shadow-xl">
      {aiAssistant.popUp}
    </span>
  )}
</button>

            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">

              {/* Resume */}
              <a
                href={resume.link}
                download
                className="hidden md:flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/40 px-5 py-2 text-sm font-medium text-slate-200 transition-all duration-300 hover:border-blue-500 hover:bg-blue-500/10 hover:text-white"
              >
                <FiDownload />
                {resume.text}
              </a>

              {/* Theme */}
<div className="relative">
  <button
    onClick={handleThemeClick}
    aria-label="Theme settings locked"
    className="w-11 h-11 rounded-full border border-slate-700 bg-slate-900/40 backdrop-blur-md flex items-center justify-center transition hover:border-blue-500 hover:rotate-180 duration-500"
  >
    {darkMode ? <FiSun /> : <FiMoon />}
  </button>

  {showThemeMessage && (
    <div className="absolute right-0 top-full mt-3 z-50 w-64 rounded-xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-sm text-slate-300 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-300">
       <div className="flex items-center gap-2">
    <FiLock className="text-blue-400" size={16} />
    <p className="font-medium text-white">Theme settings are locked</p>
  </div>
      <p className="mt-1 text-xs text-slate-400">
        Available after development is completed.
      </p>
    </div>
  )}
</div>

             {/* Mobile Menu */}
<button
  className="lg:hidden w-11 h-11 rounded-full border border-slate-700 flex items-center justify-center"
  onClick={() => setMenuOpen(!menuOpen)}
>
  {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
</button>

</div>

</div>

{/* Mobile Menu */}
{menuOpen && (
  <div className="absolute top-[calc(100%+0.75rem)] left-0 w-full lg:hidden overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
    <div className="flex flex-col gap-2 p-5">
      {navLinks.map((item) => (
        <a
          key={item.text}
          href={`#${item.link}`}
          onClick={() => setMenuOpen(false)}
          className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
        >
          {item.text}
        </a>
      ))}

      {/* AI Assistant (mobile) */}
      <button
        type="button"
        onClick={() => {
          setMenuOpen(false);
          openAI();
        }}
        className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 px-4 py-3 text-sm font-medium text-violet-300 transition hover:border-violet-400"
      >
        <BsStars />
        {aiAssistant.text}
      </button>

              
              </div>

            </div>
          )}

        </div>

      </header>
    </>
  );
}

export default Navbar;
