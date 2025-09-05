import { useEffect, useState } from "react";
import { HARD_QUIZ } from "@/app/data/flashcards";

export interface Quiz {
  question: string;
  correctAnswers: string[];
}

export default function useQuiz() {
  const [data, setData] = useState<Quiz[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      // simulate “fetch” with local constant
      setData(HARD_QUIZ);
    } catch (e: any) {
      setError(String(e?.message ?? e));
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, isLoading };
}