import { useEffect, useState } from "react";
import { getPortfolioData } from "./services/api";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import Counter from "./components/home/Counter";
import About from "./components/about/About";
import Skills from "./components/skills/Skills";
import Projects from "./components/projects/Projects";
import ChatBot from "./components/chatbot/ChatBot";
import AIAssistantPanel from "./components/chatbot/AIAssistantPanel";
import Experience from "./components/experience/Experience";
import GithubGraph from "./components/github/GithubGraph";
import Testimonials from "./components/testimonials/Testimonials";
import Certifications from "./components/certifications/Certifications";
import Education from "./components/education/Education";
import Contact from "./components/contact/Contact";
import Footer from "./components/layout/Footer";
import AdminLogin from "./components/admin/adminLogin";
import AdminTestimonials from "./components/admin/adminTestimonials";
import { AIAssistantProvider } from "./context/AIAssistantContext";
function App() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const data = await getPortfolioData();
        setPortfolioData(data);
      } catch (error) {
        console.error("Portfolio fetch error:", error);
        setError("Unable to load portfolio data.");
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolioData();
  }, []);
  /*
    Admin pages do not need portfolio data.
    This lets /admin/login open even if portfolio data is loading or unavailable.
  */
  const portfolioPage = loading ? (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-white">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-cyan-400" />
      <p className="text-sm font-medium tracking-wide text-slate-300">
        Welcome
      </p>
    </div>
  ) : error || !portfolioData ? (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-red-400">
      {error || "Portfolio data could not be loaded."}
    </div>
  ) : (
    <AIAssistantProvider>
      <div
        className="
          app-background
          min-h-screen
          bg-white
          text-slate-900
          dark:bg-slate-950
          dark:text-white
          transition-colors
          duration-300
        "
      >
        <Navbar data={portfolioData} />
        <Hero
          personal={portfolioData.personal}
          buttons={portfolioData.buttons}
        />
        <About about={portfolioData.about} />
        <Counter stats={portfolioData.stats} />
        <Skills skills={portfolioData.skills} />
        <Projects projects={portfolioData.projects} />
        <ChatBot />
        <Experience experience={portfolioData.experience} />
        <GithubGraph githubUrl={portfolioData.social?.github} />
        <Testimonials />
        <Certifications certifications={portfolioData.certifications} />
        <Education education={portfolioData.education} />
        <Contact contact={portfolioData.contact} />
        <Footer
          personal={portfolioData.personal}
          footer={portfolioData.footer}
        />

        {/* Slide-over AI Assistant panel, opened from Navbar or the ChatBot section button */}
        <AIAssistantPanel />
      </div>
    </AIAssistantProvider>
  );
  return (
    <Routes>
      <Route path="/" element={portfolioPage} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/testimonials"
        element={<AdminTestimonials />}
      />
    </Routes>
  );
}
export default App;
