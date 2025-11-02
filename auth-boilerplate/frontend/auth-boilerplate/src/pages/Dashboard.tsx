import { useEffect, useState } from "react";
import api from "../AxiosInstance"; // your configured axios instance

const CubeMystery = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    // Fetch question on mount
    const fetchQuestion = async () => {
      try {
        const res = await api.get("/quiz/questions/");
        setQuestion(res.data.question); // adjust based on your backend response
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
    fetchQuestion();
  }, []);

  const submitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/quiz/question_submit//", {
        user_answer: answer,
      });
      setFeedback(res.data.message || "Answer submitted!");
    } catch (error: any) {
      setFeedback(error.response?.data?.message || "Submission failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">The Cube Mystery</h1>
      <p className="text-center mb-4">{question}</p>

      <form onSubmit={submitAnswer} className="flex flex-col items-center gap-2">
        <input
          type="text"
          placeholder="Enter your answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="text-black rounded px-3 py-2 w-64"
        />
        <button type="submit" className="bg-red-600 px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {feedback && <p className="mt-3 text-yellow-400">{feedback}</p>}
    </div>
  );
};

export default CubeMystery;
