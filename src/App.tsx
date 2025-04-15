import { useState } from 'react';
import { Book } from 'lucide-react';
import { Word, Exercise } from './types';
import { shuffleArray } from './lib/shuffle';
import WordUploader from './components/WordUploader';
import WordList from './components/WordList';
import MatchingExercise from './components/MatchingExercise';

export default function App() {
  const [words, setWords] = useState<Word[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showWordList, setShowWordList] = useState(true);

  const handleWordsParsed = (parsedWords: Word[]) => {
    setWords(parsedWords);
    setExercises([]);
    setShowWordList(true);
  };

  const handleGenerate = () => {
    const shuffledWords = shuffleArray(words);
    const exercises: Exercise[] = [];

    for (let i = 0; i < shuffledWords.length; i += 6) {
      const group = shuffledWords.slice(i, i + 6);
      exercises.push({
        words: group,
        shuffledDefinitions: shuffleArray(group.map(w => w.definition)),
        userMatches: {},
        completed: false,
      });
    }

    setExercises(exercises);
    setCurrentExercise(0);
    setShowWordList(false);
  };

  const handleRegenerate = () => {
    setExercises([]);
    setCurrentExercise(0);
    setShowWordList(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Book className="w-8 h-8" /> Vocabulary Trainer
        </h1>

        <WordUploader onUpload={handleWordsParsed} />

        {words.length > 0 && (
          <>
            {showWordList ? (
              <WordList words={words} onGenerate={handleGenerate} />
            ) : (
              <button
                onClick={() => setShowWordList(true)}
                className="mb-4 px-4 py-2 bg-blue-100 rounded text-blue-700 hover:bg-blue-200"
              >
                Show Word List
              </button>
            )}
          </>
        )}

        {exercises.length > 0 && (
          <MatchingExercise
            exercise={exercises[currentExercise]}
            onComplete={() => {
              const updated = [...exercises];
              updated[currentExercise].completed = true;
              setExercises(updated);
            }}
            onNext={() => setCurrentExercise(currentExercise + 1)}
            onRegenerate={handleRegenerate}
            isLast={currentExercise === exercises.length - 1}
          />
        )}
      </div>
    </div>
  );
}
