import { BsStars } from "react-icons/bs";
import { useAIAssistant } from "../../context/AIAssistantContext";

function ChatBot() {
  const { openAI } = useAIAssistant();

  return (
    <section id="ai-assistant" className="py-32">
      <div className="max-w-5xl mx-auto px-6">
        {/* Heading */}
        <div className="relative mb-14">
          <div
            className="
    absolute
    -left-20
    top-0
    h-56
    w-56
    rounded-full
    bg-blue-500/10
    blur-[110px]
    "
          ></div>

          <div className="relative">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-blue-500 to-transparent"></div>

              <span
                className="
            uppercase
            tracking-[0.35em]
            text-xs
            font-semibold
            text-blue-400/80
            "
              >
                FLAGSHIP FEATURE
              </span>
            </div>

            <h2
              className="
        mt-5
        text-4xl
        md:text-5xl
        font-extrabold
        leading-tight

        bg-gradient-to-r
        from-white
        via-slate-100
        to-slate-400

        bg-clip-text
        text-transparent
        "
            >
              AI Portfolio Assistant
            </h2>

            <p
              className="
        mt-6
        max-w-xl
        text-lg
        leading-8
        text-slate-400
        "
            >
              Ask questions about my projects, skills, experience, certifications and education.
            </p>

            <div
              className="
        mt-8
        h-1
        w-28
        rounded-full
        bg-gradient-to-r
        from-blue-500
        via-purple-500
        to-cyan-500
        "
            />
          </div>
        </div>

        {/* Open panel button */}
        <button
          onClick={openAI}
          className="group inline-flex items-center gap-3 rounded-full border border-violet-500/30 bg-gradient-to-r from-violet-500/10 to-blue-500/10 px-7 py-4 text-base font-semibold text-violet-200 shadow-lg shadow-violet-500/10 transition-all duration-300 hover:scale-105 hover:border-violet-400 hover:shadow-violet-500/30"
        >
          <BsStars className="text-lg transition-transform duration-500 group-hover:rotate-12" />
          Open AI Assistant
        </button>
      </div>
    </section>
  );
}

export default ChatBot;
