"use client";

import { useState } from "react";
import clsx from "clsx";
import { Exercise } from "../types";

type MatchingExerciseProps = {
  exercise: Exercise;
  onComplete: () => void;
  onNext: () => void;
  onRegenerate: () => void;
  isLast: boolean;
};

export default function MatchingExercise({
  exercise,
  onComplete,
  onNext,
  onRegenerate,
  isLast,
}: MatchingExerciseProps) {
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<{ [key: string]: "correct" | "wrong" }>({});
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleMatch = (definition: string) => {
    if (!selectedTerm || matches[selectedTerm]) return;

    const word = exercise.words.find((w) => w.id === selectedTerm);
    if (!word) return;

    if (word.definition === definition) {
      setMatches((prev) => ({ ...prev, [selectedTerm]: definition }));
      setFeedback((prev) => ({ ...prev, [selectedTerm]: "correct" }));
    } else {
      setFeedback((prev) => ({ ...prev, [selectedTerm]: "wrong" }));
      setTimeout(() => {
        setFeedback((prev) => {
          const updated = { ...prev };
          delete updated[selectedTerm];
          return updated;
        });
      }, 1000);
    }

    setSelectedTerm(null);

    const matchedCount = Object.keys(matches).length + (word.definition === definition ? 1 : 0);
    if (matchedCount === exercise.words.length) {
      setTimeout(() => {
        onComplete();
        setDone(true);
      }, 800);
    }
  };

  const getStyle = (type: "term" | "definition", idOrText: string) => {
    const isMatched =
      type === "term"
        ? matches[idOrText]
        : Object.values(matches).includes(idOrText);

    const isSelected = selectedTerm === idOrText;

    const feedbackType =
      type === "term"
        ? feedback[idOrText]
        : feedback[
            Object.keys(matches).find(
              (key) => matches[key] === idOrText
            ) || ""
          ];

    return clsx(
      "p-3 border rounded cursor-pointer transition-all",
      isMatched && "opacity-30 pointer-events-none",
      isSelected && "ring-2 ring-blue-400",
      feedbackType === "wrong" && "border-red-500 bg-red-100",
      feedbackType === "correct" && "opacity-30 pointer-events-none"
    );
  };

  return (
    <div className="bg-white p-6 rounded shadow mt-4">
      <h2 className="text-lg font-semibold mb-4">Match the Words</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          {exercise.words.map((w) => (
            <div
              key={w.id}
              className={getStyle("term", w.id)}
              onClick={() => {
                if (!matches[w.id]) setSelectedTerm(w.id);
              }}
            >
              {w.term}
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {exercise.shuffledDefinitions.map((def, i) => (
            <div
              key={i}
              className={getStyle("definition", def)}
              onClick={() => handleMatch(def)}
            >
              {def}
            </div>
          ))}
        </div>
      </div>

      {done && (
        <div className="mt-6 flex gap-4">
          {!isLast ? (
            <button
              onClick={onNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={onRegenerate}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Regenerate Exercise
            </button>
          )}
        </div>
      )}
    </div>
  );
}
