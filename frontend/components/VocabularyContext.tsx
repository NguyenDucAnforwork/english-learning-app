'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { getVocabularyContext, VocabularyContext as VocabContext } from '../lib/api';

export default function VocabularyContext() {
  const { token } = useAuth();
  const [context, setContext] = useState<VocabContext | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNewContext = async () => {
    if (!token) return;
    try {
      setLoading(true);
      setSelectedAnswer(null);
      setIsCorrect(null);
      const newContext = await getVocabularyContext(token);
      setContext(newContext);
      setError('');
    } catch (err) {
      setError('Failed to load vocabulary context');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewContext();
  }, [token]);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer || !context) return;
    setSelectedAnswer(answer);
    setIsCorrect(answer === context.correct_answer);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={fetchNewContext}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!context) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white/95 dark:bg-[#1e1b4b]/80 backdrop-blur-xl rounded-2xl shadow-xl border border-indigo-200 dark:border-indigo-800">
      <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-6 text-center">
        🧠 Fill in the blank
      </h2>

      <p className="text-lg mb-6 text-center text-gray-800 dark:text-gray-200">
        {context.context.split('___').map((part, index, array) => (
          <span key={index}>
            {part}
            {index < array.length - 1 && (
              <span className="inline-block min-w-[80px] px-2 py-1 mx-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100 rounded font-semibold">
                ___
              </span>
            )}
          </span>
        ))}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {context.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isAnswer = option === context.correct_answer;
          const bgColor =
            selectedAnswer == null
              ? 'bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800'
              : isSelected
              ? isAnswer
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
              : isAnswer
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';

          return (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              disabled={!!selectedAnswer}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-center transition-colors duration-200 ${bgColor}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div className="text-center">
          <p
            className={`text-xl font-bold ${
              isCorrect ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {isCorrect ? '✅ Correct!' : '❌ Incorrect. Try again!'}
          </p>
          <button
            onClick={fetchNewContext}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            Next Question →
          </button>
        </div>
      )}
    </div>
  );
}
