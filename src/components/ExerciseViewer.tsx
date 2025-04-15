import { Exercise } from '../types';

interface ExerciseViewerProps {
  exercise: Exercise;
  exerciseIndex: number;
  total: number;
  onMatch: (wordId: string, definition: string, exerciseIndex: number) => void;
  onNext: () => void;
}

function ExerciseViewer({
  exercise,
  exerciseIndex,
  total,
  onMatch,
  onNext,
}: ExerciseViewerProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Exercise {exerciseIndex + 1} of {total}
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-2">Words:</h3>
          {exercise.words.map((word) => (
            <div key={word.id} className="mb-2">
              <p className="font-medium">{word.term}</p>
              <select
                value={exercise.userAnswers[word.id] || ''}
                onChange={(e) => onMatch(word.id, e.target.value, exerciseIndex)}
                className="mt-1 w-full p-2 border rounded"
                disabled={exercise.isComplete}
              >
                <option value="">Select definition</option>
                {exercise.shuffledDefinitions.map((def) => (
                  <option key={def} value={def}>
                    {def}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {exercise.isComplete && (
          <div className="bg-gray-50 p-4 rounded">
            <h3 className="font-semibold mb-2">Results:</h3>
            <p className="text-lg">
              Score: {exercise.score} out of {exercise.words.length}
            </p>
            {exerciseIndex < total - 1 && (
              <button
                onClick={onNext}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Next Exercise
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExerciseViewer;
