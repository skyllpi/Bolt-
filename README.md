
# BrainBolt: Adaptive Intelligence Quiz Platform

BrainBolt is an adaptive infinite quiz platform designed to dynamically adjust question difficulty based on real-time user performance. The system focuses on controlled difficulty progression, scoring fairness, and leaderboard consistency while preventing instability in adaptive transitions.

This project was implemented as part of the BrainBolt technical assignment and emphasizes correctness, stability, and clear system design over over-engineering.

---
## Demo Video

https://github.com/user-attachments/assets/d2d43955-3bd0-4790-98a0-b93744089f9c

Due to GitHub file size constraints, a detailed walkthrough and technical explanation are also hosted on YouTube.
> 

---
The demo covers:
- Real-time adaptive difficulty changes  
- Streak increments and resets  
- Score calculation logic  
- Leaderboard updates  
- Backend logic walkthrough  

---
## Future Enhancements (Not Implemented Due to Time Constraints)
### 1. Retrieval-Augmented Quiz Generation (RAG-Based System)
### 2. AI Agent-Based Question Generation
### 3. Advanced UI/UX and Gamification
### 4. Persistent Storage and Distributed Leaderboards
---
## Low-Level Design (LLD)

### 1. Adaptive Difficulty Algorithm (Ping-Pong Prevention)
To balance user engagement with an appropriate challenge level, a robust adaptive logic has been implemented:
* **Minimum Streak Stabilizer**: Difficulty increments only after a **consecutive streak of 2** correct answers. This prevents the "ping-pong effect" (rapid oscillations in difficulty).
* **Immediate Decay**: Any incorrect answer results in an **immediate decrement** in difficulty. This ensures the system stabilizes quickly for the user.
* **Dynamic Scoring**: Scores are calculated based on difficulty level and current streak: `Score = Difficulty × 10 × Multiplier (capped at 2.0x)`.

### 2. API Design & Idempotency
The system is built to strictly deliver on the suggested API specifications:
* **Idempotency**: Using `lastQuestionId` and `stateVersion` in the backend, the system ensures that duplicate answer submissions do not result in double-scoring or streak manipulation.
* **SSR (Server-Side Rendering)**: The "Hall of Fame" leaderboard is fully Server-Side Rendered (SSR) to ensure fast load times and real-time ranking accuracy.

---

## 🛠️ Tech Stack
* **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS v4.
* **Backend**: Node.js, Express.js.
* **Containerization**: Docker & Docker Compose.

---

## How to Run (Single Command)

As required, the entire application stack runs using a single command:

```bash
docker-compose up --build

