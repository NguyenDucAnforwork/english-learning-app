'use client';

import { useState } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../lib/auth';

type Story = {
  id: number;
  title: string;
  content: string;
  vocabulary: string[];
  created_at: string;
};

export default function StoryPage() {
  const { token } = useAuth();
  const [vocabInput, setVocabInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    console.log("🔍 handleGenerate fired!");
  
    if (!vocabInput.trim()) return;
    setLoading(true);
    try {
      console.log("📦 Sending to API:", vocabInput);
  
      const res = await fetch('http://localhost:8000/story/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: titleInput || 'My Personalized Story',
          vocabulary: vocabInput.split(',').map((v) => v.trim()),
        }),
      });
  
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to generate story: ${res.status} - ${errText}`);
      }
  
      const data = await res.json();
      console.log("✅ Story received:", data);
      setStory(data);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleMakeExercise = async () => {
    if (!story) return;

    console.log('🧠 Making exercise for story ID:', story.id);

    try {
      const res = await fetch('http://localhost:8000/exercises/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ story_id: story.id }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Failed to create exercise: ${res.status} - ${errText}`);
      }

      console.log('✅ Exercise created!');
      window.location.href = '/exercises';
    } catch (err) {
      alert((err as Error).message);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-[#fefae0]/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-yellow-200">
          <h2 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center flex items-center justify-center gap-2">
            📖 Personalized Story
          </h2>

          <input
            type="text"
            placeholder="Story title (optional)"
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <textarea
            rows={3}
            placeholder="Enter vocabulary (comma-separated)..."
            className="w-full mb-4 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={vocabInput}
            onChange={(e) => setVocabInput(e.target.value)}
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? 'Generating...' : 'Generate Story'}
          </button>

          {story && (
            <div className="mt-8 bg-white/95 rounded-xl shadow p-6 border border-indigo-100 space-y-4">
              <h3 className="text-2xl font-bold text-indigo-800">{story.title}</h3>
              <p className="text-gray-800 whitespace-pre-line">{story.content}</p>
              <p className="text-sm text-gray-600 italic">
                Vocabulary: {story.vocabulary.join(', ')}
              </p>

              <button
                className="mt-4 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                onClick={handleMakeExercise}
              >
                Make Exercises →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
