// Isme 'use client' nahi likhenge kyunki ye SSR hai
import Link from 'next/link';

async function getLeaderboards() {
  const [scoreRes, streakRes] = await Promise.all([
    fetch('http://localhost:3001/leaderboard/score', { cache: 'no-store' }),
    fetch('http://localhost:3001/leaderboard/streak', { cache: 'no-store' })
  ]);
  return {
    scores: (await scoreRes.json()).leaderboard,
    streaks: (await streakRes.json()).leaderboard
  };
}

export default async function LeaderboardPage() {
  const data = await getLeaderboards();

  return (
    <main className="min-h-screen bg-bolt-bg p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black italic text-white mb-4">HALL OF <span className="text-bolt-primary">FAME</span></h1>
        <Link href="/" className="text-bolt-primary hover:underline font-bold">← BACK TO MISSION</Link>
      </header>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Score Board */}
        <section className="bg-white/5 p-6 rounded-bolt border border-white/10">
          <h2 className="text-xl font-bold mb-6 text-bolt-primary">🏆 TOP SCORES</h2>
          <div className="space-y-3">
            {data.scores.map((entry: any, i: number) => (
              <div key={i} className="flex justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="font-mono text-gray-500">#{i + 1}</span>
                <span className="font-bold">{entry.userId}</span>
                <span className="text-bolt-primary font-black">{entry.score}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Streak Board */}
        <section className="bg-white/5 p-6 rounded-bolt border border-white/10">
          <h2 className="text-xl font-bold mb-6 text-bolt-accent">🔥 LONGEST STREAKS</h2>
          <div className="space-y-3">
            {data.streaks.map((entry: any, i: number) => (
              <div key={i} className="flex justify-between p-3 bg-white/5 rounded-lg border border-white/5">
                <span className="font-mono text-gray-500">#{i + 1}</span>
                <span className="font-bold">{entry.userId}</span>
                <span className="text-bolt-accent font-black">{entry.maxStreak}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}