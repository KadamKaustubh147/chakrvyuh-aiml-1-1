import { useEffect, useState } from "react";
import api from "../AxiosInstance";
import bgImage from "./bg.webp"; // background image path

const CubeMystery = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await api.get("/quiz/questions/");
        setQuestion(res.data.riddle);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchQuestion();
  }, []);

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/quiz/question_submit/", {
        user_answer: answer,
      });
      if (res.status === 200) setFeedback("✅ Submitted successfully!");
    } catch (error: any) {
      setFeedback(error.response?.data?.error || "Submission failed!");
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* overlay for readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* content */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Club Mystery</h1>
        <p className="text-center mb-4 text-lg">{question}</p>

        <form
          onSubmit={submitAnswer}
          className="flex flex-col items-center gap-3"
        >
          <input
            type="text"
            placeholder="Enter your answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="text-white bg-transparent border border-white/60 rounded px-3 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
          >
            Submit
          </button>
        </form>

        {feedback && <p className="mt-3 text-yellow-400">{feedback}</p>}
      </div>
    </div>
  );
};

export default CubeMystery;
