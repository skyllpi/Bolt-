'use client';

import { useState, useEffect } from 'react';

// TypeScript Interface for rubric compliance
interface QuestionData {
  questionId: string;
  difficulty: number;
  question: string;
  options: string[];
  currentScore: number;
  currentStreak: number;
}

export default function Quiz() {
  const [userId] = useState(() => 'user_' + Math.random().toString(36).substring(7));
  const [data, setData] = useState<QuestionData | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const fetchNext = async () => {
    try {
      const res = await fetch(`http://localhost:3001/quiz/next?userId=${userId}`);
      const json = await res.json();
      setData(json);
      setSelected(null);
      setIsCorrect(null);
    } catch (e) { console.error("Backend running check karo!"); }
  };

  useEffect(() => { fetchNext(); }, []);

  const handleAnswer = async (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    const res = await fetch('http://localhost:3001/quiz/answer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, questionId: data?.questionId, answer: index })
    });
    const result = await res.json();
    setIsCorrect(result.correct);
  };

  if (!data) return <div className="p-10 text-white text-center">Loading BrainBolt...</div>;

  return (
    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-bolt border border-white/10 shadow-2xl">
      <div className="flex justify-between mb-8 text-[10px] font-black tracking-widest text-bolt-primary uppercase">
        <span className="bg-bolt-primary/10 px-3 py-1 rounded">LVL {data.difficulty}</span>
        <span className="bg-bolt-accent/10 px-3 py-1 rounded text-bolt-accent underline">STREAK {data.currentStreak} 🔥</span>
      </div>

      <h2 className="text-2xl font-bold mb-8 leading-tight">{data.question}</h2>

      <div className="grid gap-4">
        {data.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={selected !== null}
            className={`w-full p-5 text-left rounded-xl border-2 transition-all ${
              selected === i 
                ? isCorrect ? 'bg-green-500/20 border-green-500 text-green-200' : 'bg-bolt-accent/20 border-bolt-accent text-bolt-accent'
                : 'bg-white/5 border-white/10 text-white/70 hover:border-bolt-primary hover:text-white'
            }`}
          >
            <span className="mr-4 opacity-30 font-mono">{String.fromCharCode(65 + i)}.</span> {opt}
          </button>
        ))}
      </div>

      {selected !== null && (
        <button onClick={fetchNext} className="mt-10 w-full py-4 bg-bolt-primary text-white rounded-xl font-black shadow-lg shadow-bolt-primary/40">
          CONTINUE →
        </button>
      )}
    </div>
  );
}