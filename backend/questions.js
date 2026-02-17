// Hardcoded question bank organized by difficulty (1-10)
const questionBank = {
  1: [
    {
      id: 'q1_1',
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1
    },
    {
      id: 'q1_2',
      question: 'What color is the sky on a clear day?',
      options: ['Green', 'Blue', 'Red', 'Yellow'],
      correctAnswer: 1
    },
    {
      id: 'q1_3',
      question: 'How many legs does a dog have?',
      options: ['2', '3', '4', '5'],
      correctAnswer: 2
    }
  ],
  2: [
    {
      id: 'q2_1',
      question: 'What is 5 × 3?',
      options: ['12', '15', '18', '20'],
      correctAnswer: 1
    },
    {
      id: 'q2_2',
      question: 'Which planet is closest to the Sun?',
      options: ['Venus', 'Mercury', 'Earth', 'Mars'],
      correctAnswer: 1
    },
    {
      id: 'q2_3',
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2
    }
  ],
  3: [
    {
      id: 'q3_1',
      question: 'What is 12 × 12?',
      options: ['120', '132', '144', '156'],
      correctAnswer: 2
    },
    {
      id: 'q3_2',
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['Charles Dickens', 'William Shakespeare', 'Mark Twain', 'Jane Austen'],
      correctAnswer: 1
    },
    {
      id: 'q3_3',
      question: 'What is the largest ocean on Earth?',
      options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
      correctAnswer: 3
    }
  ],
  4: [
    {
      id: 'q4_1',
      question: 'What is the square root of 169?',
      options: ['11', '12', '13', '14'],
      correctAnswer: 2
    },
    {
      id: 'q4_2',
      question: 'In which year did World War II end?',
      options: ['1943', '1944', '1945', '1946'],
      correctAnswer: 2
    },
    {
      id: 'q4_3',
      question: 'What is the chemical symbol for gold?',
      options: ['Go', 'Gd', 'Au', 'Ag'],
      correctAnswer: 2
    }
  ],
  5: [
    {
      id: 'q5_1',
      question: 'What is 15% of 200?',
      options: ['25', '30', '35', '40'],
      correctAnswer: 1
    },
    {
      id: 'q5_2',
      question: 'Who painted the Mona Lisa?',
      options: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
      correctAnswer: 1
    },
    {
      id: 'q5_3',
      question: 'What is the smallest prime number?',
      options: ['0', '1', '2', '3'],
      correctAnswer: 2
    }
  ],
  6: [
    {
      id: 'q6_1',
      question: 'What is the derivative of x² with respect to x?',
      options: ['x', '2x', 'x²', '2'],
      correctAnswer: 1
    },
    {
      id: 'q6_2',
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
      correctAnswer: 1
    },
    {
      id: 'q6_3',
      question: 'How many countries are in the European Union (as of 2024)?',
      options: ['25', '27', '29', '31'],
      correctAnswer: 1
    }
  ],
  7: [
    {
      id: 'q7_1',
      question: 'What is the capital of Kazakhstan?',
      options: ['Almaty', 'Astana', 'Bishkek', 'Tashkent'],
      correctAnswer: 1
    },
    {
      id: 'q7_2',
      question: 'In physics, what does "c" represent?',
      options: ['Charge', 'Speed of light', 'Capacitance', 'Conductivity'],
      correctAnswer: 1
    },
    {
      id: 'q7_3',
      question: 'What is the integral of 1/x dx?',
      options: ['x', 'ln(x)', '1/x²', 'e^x'],
      correctAnswer: 1
    }
  ],
  8: [
    {
      id: 'q8_1',
      question: 'What is Avogadro\'s number (approximately)?',
      options: ['6.02 × 10²³', '3.14 × 10¹⁶', '1.60 × 10⁻¹⁹', '9.81 × 10⁸'],
      correctAnswer: 0
    },
    {
      id: 'q8_2',
      question: 'Who developed the theory of general relativity?',
      options: ['Isaac Newton', 'Albert Einstein', 'Niels Bohr', 'Stephen Hawking'],
      correctAnswer: 1
    },
    {
      id: 'q8_3',
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
      correctAnswer: 1
    }
  ],
  9: [
    {
      id: 'q9_1',
      question: 'What is the Heisenberg Uncertainty Principle about?',
      options: ['Energy conservation', 'Position and momentum', 'Wave-particle duality', 'Quantum entanglement'],
      correctAnswer: 1
    },
    {
      id: 'q9_2',
      question: 'In graph theory, what is a Hamiltonian path?',
      options: ['Path visiting all edges once', 'Path visiting all vertices once', 'Shortest path', 'Maximum flow path'],
      correctAnswer: 1
    },
    {
      id: 'q9_3',
      question: 'What year was the Byzantine Empire founded?',
      options: ['330 AD', '476 AD', '800 AD', '1054 AD'],
      correctAnswer: 0
    }
  ],
  10: [
    {
      id: 'q10_1',
      question: 'What is the Riemann Hypothesis concerned with?',
      options: ['Prime numbers', 'Zeta function zeros', 'Topology', 'Group theory'],
      correctAnswer: 1
    },
    {
      id: 'q10_2',
      question: 'Which theorem states that no consistent system can prove its own consistency?',
      options: ['Fermat\'s Last Theorem', 'Gödel\'s Incompleteness Theorem', 'Bayes\' Theorem', 'Central Limit Theorem'],
      correctAnswer: 1
    },
    {
      id: 'q10_3',
      question: 'What is the half-life of Carbon-14?',
      options: ['5,730 years', '10,000 years', '1,200 years', '50,000 years'],
      correctAnswer: 0
    }
  ]
};

function getRandomQuestion(difficulty) {
  const questions = questionBank[difficulty];
  return questions[Math.floor(Math.random() * questions.length)];
}

module.exports = { questionBank, getRandomQuestion };