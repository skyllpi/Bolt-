const express = require('express');
const cors = require('cors');
const { getRandomQuestion } = require('./questions');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory storage
const userState = {}; // userId -> { difficulty, streak, score, consecutiveCorrect, lastQuestionId }
const leaderboards = {
  score: [], // [{ userId, score }]
  streak: []  // [{ userId, maxStreak }]
};

// Initialize user state
function initializeUser(userId) {
  if (!userState[userId]) {
    userState[userId] = {
      difficulty: 1,
      streak: 0,
      maxStreak: 0,
      score: 0,
      consecutiveCorrect: 0, // For ping-pong prevention
      lastQuestionId: null
    };
  }
}

// Update leaderboard
function updateLeaderboard(userId) {
  const state = userState[userId];
  
  // Update score leaderboard
  let scoreEntry = leaderboards.score.find(e => e.userId === userId);
  if (scoreEntry) {
    scoreEntry.score = state.score;
  } else {
    leaderboards.score.push({ userId, score: state.score });
  }
  leaderboards.score.sort((a, b) => b.score - a.score);
  
  // Update streak leaderboard
  let streakEntry = leaderboards.streak.find(e => e.userId === userId);
  if (streakEntry) {
    streakEntry.maxStreak = state.maxStreak;
  } else {
    leaderboards.streak.push({ userId, maxStreak: state.maxStreak });
  }
  leaderboards.streak.sort((a, b) => b.maxStreak - a.maxStreak);
}

// Get leaderboard rank
function getLeaderboardRank(userId, type) {
  const board = type === 'score' ? leaderboards.score : leaderboards.streak;
  const index = board.findIndex(e => e.userId === userId);
  return index >= 0 ? index + 1 : null;
}

// GET /quiz/next?userId=1
app.get('/quiz/next', (req, res) => {
  const userId = req.query.userId;
  
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  
  initializeUser(userId);
  const state = userState[userId];
  
  // Get a random question at current difficulty
  const question = getRandomQuestion(state.difficulty);
  
  // Store the question ID for validation
  state.lastQuestionId = question.id;
  
  res.json({
    questionId: question.id,
    difficulty: state.difficulty,
    question: question.question,
    options: question.options,
    currentScore: state.score,
    currentStreak: state.streak
  });
});

// POST /quiz/answer
app.post('/quiz/answer', (req, res) => {
  const { userId, questionId, answer } = req.body;
  
  if (!userId || !questionId || answer === undefined) {
    return res.status(400).json({ error: 'userId, questionId, and answer are required' });
  }
  
  initializeUser(userId);
  const state = userState[userId];
  
  // Validate that this is the expected question
  if (state.lastQuestionId !== questionId) {
    return res.status(400).json({ error: 'Invalid question ID' });
  }
  
  // Find the question to check correctness
  const { questionBank } = require('./questions');
  let questionObj = null;
  
  for (let difficulty in questionBank) {
    const found = questionBank[difficulty].find(q => q.id === questionId);
    if (found) {
      questionObj = found;
      break;
    }
  }
  
  if (!questionObj) {
    return res.status(400).json({ error: 'Question not found' });
  }
  
  const correct = answer === questionObj.correctAnswer;
  const oldDifficulty = state.difficulty;
  const oldStreak = state.streak;
  let scoreDelta = 0;
  
  if (correct) {
    // Increment streak
    state.streak++;
    state.maxStreak = Math.max(state.maxStreak, state.streak);
    
    // Increment consecutive correct counter
    state.consecutiveCorrect++;
    
    // PING-PONG PREVENTION: Only increase difficulty after 2 consecutive correct answers
    if (state.consecutiveCorrect >= 2) {
      state.difficulty = Math.min(10, state.difficulty + 1);
      state.consecutiveCorrect = 0; // Reset counter after difficulty increase
    }
    
    // Calculate score with multiplier
    const multiplier = Math.min(1 + state.streak * 0.1, 2);
    scoreDelta = Math.round(oldDifficulty * 10 * multiplier);
    state.score += scoreDelta;
    
  } else {
    // Reset streak
    state.streak = 0;
    
    // Reset consecutive correct counter
    state.consecutiveCorrect = 0;
    
    // Decrease difficulty immediately on wrong answer
    state.difficulty = Math.max(1, state.difficulty - 1);
    
    scoreDelta = 0; // No score on wrong answer
  }
  
  // Update leaderboards
  updateLeaderboard(userId);
  
  res.json({
    correct,
    newDifficulty: state.difficulty,
    newStreak: state.streak,
    scoreDelta,
    totalScore: state.score,
    leaderboardRankScore: getLeaderboardRank(userId, 'score'),
    leaderboardRankStreak: getLeaderboardRank(userId, 'streak')
  });
});

// GET /leaderboard/score
app.get('/leaderboard/score', (req, res) => {
  res.json({
    leaderboard: leaderboards.score.slice(0, 10) // Top 10
  });
});

// GET /leaderboard/streak
app.get('/leaderboard/streak', (req, res) => {
  res.json({
    leaderboard: leaderboards.streak.slice(0, 10) // Top 10
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`BrainBolt backend running on port ${PORT}`);
});