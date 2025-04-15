"use client";

import { Word } from "../types";

interface WordListProps {
  words: Word[];
  onGenerate: () => void;
}

export default function WordList({ words, onGenerate }: WordListProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Word List</h2>
      <ul className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
        {words.map((word, index) => (
          <li key={word.id} className="text-gray-700">
            {index + 1}. <strong>{word.term}</strong> - {word.definition}
          </li>
        ))}
      </ul>
      {words.length >= 6 && (
        <button
          onClick={onGenerate}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Exercises
        </button>
      )}
    </div>
  );
}
