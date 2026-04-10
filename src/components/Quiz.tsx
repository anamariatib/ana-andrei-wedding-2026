import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { containerVariants, itemVariants } from '../utils/animations';

import Button from './shared/Button';

const QUESTIONS = [
  {
    id: 1,
    question: 'Când s-au intersectat drumurile noastre pentru prima dată?',
    options: [
      'În primul an de liceu (2010)',
      'În anul IV de facultate (2017)',
      'La primul job (2022)',
    ],
    correct: 1,
    funFact:
      'Destinul a lucrat în favoarea noastră: ne-am cunoscut în anul IV de Medicină, când Ana s-a mutat într-o altă serie.',
  },
  {
    id: 2,
    question: 'Cine a făcut primul pas în povestea noastră?',
    options: ['Andrei', 'Ana', 'A fost reciproc'],
    correct: 2,
    funFact:
      'Sincer? Încă dezbatem subiectul la cafea, dar cert este că privirile s-au întâlnit exact la mijloc!',
  },
  {
    id: 3,
    question: 'După câți ani de prietenie am decis să formăm un cuplu?',
    options: ['3 ani', '5 ani', '7 ani'],
    correct: 2,
    funFact:
      'Unele lucruri bune cer timp. După 7 ani de când ne cunoșteam, în toamna lui 2024, totul a căpătat sens.',
  },
  {
    id: 4,
    question: 'Unde a fost prima noastră evadare în doi?',
    options: ['La Bușteni', 'La Cluj', 'La București'],
    correct: 1,
    funFact:
      'În prima noastră lună împreună, am plecat de 1 Decembrie să explorăm Clujul, de care ne-am îndrăgostit instantaneu.',
  },
  {
    id: 5,
    question: 'Unde a spus Ana "DA"?',
    options: [
      'În Bușteni, ianuarie 2025',
      'În București, iunie 2025',
      'În Iași, în octombrie 2025',
    ],
    correct: 1,
    funFact:
      'Planul era un decor montan, dar Andrei n-a mai avut răbdare nicio zi! A ales să o ceară fix de aniversarea ei, după o zi de relaxare la Therme.',
  },
  {
    id: 6,
    question: 'Unde ne plănuim luna de miere?',
    options: ['În Japonia', 'În India', 'În Islanda'],
    correct: 2,
    funFact:
      'Ne dorim sa mergem in toate destinațiile de mai sus pe viitor, dar momentan am decis să vizităm o locație din Europa!',
  },
];

const correctIcon = (
  <svg
    width="16"
    height="16"
    viewBox="55 80 402 380"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M256,440 L232,418 C135,330 72,273 72,202 C72,144 117,99 175,99 C207,99 238,114 256,138 C274,114 305,99 337,99 C395,99 440,144 440,202 C440,273 377,330 280,418 L256,440 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M185,260 L245,320 L340,205"
      fill="none"
      stroke="currentColor"
      strokeWidth="35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const wrongIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="256"
      cy="256"
      r="210"
      fill="none"
      stroke="currentColor"
      strokeWidth="35"
    />
    <g stroke="currentColor" strokeWidth="35" strokeLinecap="round">
      <line x1="175" y1="175" x2="337" y2="337" />
      <line x1="337" y1="175" x2="175" y2="337" />
    </g>
  </svg>
);

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (index === QUESTIONS[currentStep].correct) setScore((prev) => prev + 1);
  };

  const handleNextStep = () => {
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedOption(null);
    setIsFinished(false);
    setScore(0);
  };

  return (
    <motion.section
      className="section-wrapper relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible -z-10">
        <div className="relative w-full max-w-[800px] h-[700px]">
          <div className="absolute inset-0 bg-cream-darker/20 watercolor-mask rotate-12 scale-125" />
          <div className="absolute inset-0 bg-olive-green/10 watercolor-mask -rotate-12 scale-110" />
        </div>
      </div>

      <motion.div className="section-title mb-6">
        <motion.h2 variants={itemVariants}>Quiz</motion.h2>

        <motion.p variants={itemVariants} className="section-description">
          Puțină distracție înainte de marea petrecere! Oare câte detalii
          reușești să ghicești despre noi?!
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="font-script-swash text-5xl text-dark-green"
        >
          i
        </motion.p>
      </motion.div>

      <motion.div
        className="relative z-10 min-h-[560px] flex flex-col items-center px-4"
        variants={itemVariants}
      >
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              <p className="text-[11px] uppercase tracking-[0.4em] text-olive-green mb-6 font-bold">
                Întrebarea {currentStep + 1} / {QUESTIONS.length}
              </p>

              <h3 className="mb-8 px-10">{QUESTIONS[currentStep].question}</h3>

              <div className="flex flex-col gap-3 w-full max-w-md">
                {QUESTIONS[currentStep].options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = index === QUESTIONS[currentStep].correct;

                  let btnBase =
                    'bg-white/40 border-cream-darker/60 hover:bg-white/60 text-dark-brown/80';

                  if (selectedOption !== null) {
                    if (isCorrect)
                      btnBase =
                        'bg-light-green/30 border-dark-green text-dark-green font-bold';
                    else if (isSelected)
                      btnBase = 'bg-rose/10 border-rose text-rose';
                    else btnBase = 'opacity-70 border-cream-darker';
                  }

                  return (
                    <button
                      key={index}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(index)}
                      className={`py-5 px-8 rounded-sm border transition-all duration-500 font-serif flex justify-between items-center ${btnBase}`}
                    >
                      <span className="text-left">{option}</span>
                      {selectedOption !== null && (
                        <span className="text-base shrink-0 ml-2">
                          {isCorrect
                            ? correctIcon
                            : isSelected
                              ? wrongIcon
                              : ''}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="h-[180px] mt-8 flex items-start justify-center w-full">
                <AnimatePresence>
                  {selectedOption !== null && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center max-w-sm"
                    >
                      <p className="text-base italic text-dark-brown/60 mb-8 leading-relaxed">
                        {QUESTIONS[currentStep].funFact}
                      </p>

                      <Button onClick={handleNextStep}>
                        {currentStep < QUESTIONS.length - 1
                          ? 'Următoarea întrebare'
                          : 'Vezi rezultatul'}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 flex flex-col items-center text-center"
            >
              <h2 className="text-olive-green mb-6">
                {score <= 2 && 'Mai încearcă!'}
                {score > 2 && score < QUESTIONS.length && 'Bravo!'}
                {score === QUESTIONS.length && 'Perfect!'}
              </h2>
              <p className="font-serif text-lg text-dark-brown">
                Ai știut răspunsul la <strong>{score}</strong> din{' '}
                <strong>{QUESTIONS.length}</strong> întrebări.
              </p>
              <p className="font-serif italic text-dark-brown/50 mt-4 mb-12 max-w-xs leading-relaxed">
                Abia așteptăm să ne vedem pe 12 iulie!
              </p>

              <Button onClick={resetQuiz} variant="outline">
                Mai joacă o dată
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
