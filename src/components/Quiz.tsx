import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    question: 'După câți ani de prietenie am decis să facem pasul cel mare?',
    options: ['3 ani', '5 ani', '7 ani'],
    correct: 2,
    funFact:
      'Unele lucruri bune cer timp. După 7 ani de când ne cunoșteam, în toamna lui 2024, totul a căpătat sens.',
  },
  {
    id: 4,
    question: 'Care a fost prima noastră evadare în doi?',
    options: ['La Bușteni', 'La Cluj', 'La București'],
    correct: 1,
    funFact:
      'A fost dragoste la prima... excursie! În prima noastră lună împreună, am plecat de 1 Decembrie să explorăm Clujul de care ne-am îndrăgostit instantaneu.',
  },
  {
    id: 5,
    question: "Unde a răsunat primul 'DA' din viața Anei?",
    options: [
      'În Bușteni, ianuarie 2025',
      'În București, iunie 2025',
      'În Iași, în octombrie 2025',
    ],
    correct: 1,
    funFact:
      'Planul era un decor montan, dar Andrei n-a mai avut răbdare nicio zi! A ales să o ceară fix de ziua ei, dupa o zi de relaxare la Therme.',
  },
];

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    if (index === QUESTIONS[currentStep].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentStep < QUESTIONS.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
      }
    }, 1500); // Pauză scurtă pentru a vedea feedback-ul
  };

  return (
    <section className="py-24 px-6 overflow-hidden">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="mb-12">Povestea noastră în câteva întrebări</h2>

        <div className="relative min-h-[350px]">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-cream-darker watercolor-mask-subtle"
              >
                <p className="text-xs uppercase tracking-widest text-rose mb-4">
                  Întrebarea {currentStep + 1} / {QUESTIONS.length}
                </p>
                <h3 className="font-serif text-2xl text-dark-brown mb-8">
                  {QUESTIONS[currentStep].question}
                </h3>

                <div className="flex flex-col gap-3">
                  {QUESTIONS[currentStep].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        selectedOption === null && handleOptionSelect(index)
                      }
                      className={`py-3 px-6 rounded-xl border transition-all font-serif ${
                        selectedOption === index
                          ? index === QUESTIONS[currentStep].correct
                            ? 'bg-light-green/20 border-dark-green text-dark-green'
                            : 'bg-rose/10 border-rose text-rose'
                          : 'border-cream-darker hover:border-dark-green/50'
                      }`}
                    >
                      {option}
                      {selectedOption === index && (
                        <span className="ml-2">
                          {index === QUESTIONS[currentStep].correct ? '✓' : '✗'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {selectedOption !== null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-sm italic text-dark-brown/60"
                  >
                    {QUESTIONS[currentStep].funFact}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10"
              >
                <h3 className="font-script text-6xl text-dark-green mb-4">
                  Bravo!
                </h3>
                <p className="font-serif text-lg text-dark-brown">
                  Ai nimerit {score} din {QUESTIONS.length} întrebări.
                </p>
                <p className="font-serif italic text-dark-brown/60 mt-2">
                  Abia așteptăm să ne vedem la nuntă!
                </p>
                <button
                  onClick={() => {
                    setCurrentStep(0);
                    setIsFinished(false);
                    setScore(0);
                  }}
                  className="mt-8 text-xs uppercase tracking-widest border-b border-dark-green pb-1"
                >
                  Mai joacă o dată
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
