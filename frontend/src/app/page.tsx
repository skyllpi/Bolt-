import Quiz from '@/components/Quiz';
import Link from 'next/link'; // Import this

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[radial-gradient(circle_at_top,_var(--color-bolt-primary)_0%,_transparent_50%)]">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-16">
          <h1 className="text-7xl font-black italic tracking-tighter text-white">BRAIN<span className="text-bolt-primary">BOLT</span></h1>
          <p className="mt-4 text-bolt-primary/60 font-bold uppercase tracking-widest text-xs">Adaptive Intelligence Quiz</p>
          
          {/* Ye button add kar rubric ka navigation point poora karne ke liye */}
          <div className="mt-6">
            <Link href="/leaderboard" className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold border border-white/10 transition-all">
              🏆 VIEW GLOBAL RANKINGS
            </Link>
          </div>
        </header>
        <Quiz />
      </div>
    </main>
  );
}