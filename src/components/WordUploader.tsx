"use client";

import { ChangeEvent } from "react";
import { Word } from "../types";

interface WordUploaderProps {
  onUpload: (words: Word[]) => void;
}

export default function WordUploader({ onUpload }: WordUploaderProps) {
  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const text = await file.text();
    const lines = text.split("\n").filter(Boolean);

    const words: Word[] = lines.map((line, index) => {
      const [term, ...definitionParts] = line.trim().split(" ");
      const definition = definitionParts.join(" ");
      return {
        id: `${index}-${term}`,
        term,
        definition,
      };
    });

    onUpload(words);
  };

  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">Upload Word List (.txt):</label>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="border border-gray-300 p-2 rounded w-full"
      />
    </div>
  );
}
