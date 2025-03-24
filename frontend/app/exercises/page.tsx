'use client';

import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { useAuth } from '../../lib/auth';

interface Exercise {
  id: number;
  created_at: string;
  story: {
    title: string;
    vocabulary: string[];
    content: string;
  };
}

export default function ExercisesPage() {
  const { token, user, loading} = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [openStoryId, setOpenStoryId] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchExercises = async () => {
    try {
      const res = await fetch('http://localhost:8000/exercises/list', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Unauthorized');
  
      const data = await res.json();
      if (Array.isArray(data)) {
        setExercises(data);
      } else {
        throw new Error('Invalid data');
      }
    } catch (err) {
      console.warn('⚠️ Backend data not available.');
      setExercises([]); // Nếu lỗi, tạm thời không load mẫu từ json nữa.
    }
  };
  
  useEffect(() => {
    fetchExercises();
  }, []);
  

  useEffect(() => {
        // still checking token/user? do nothing yet
        if (loading) return;
    
        // done loading. If no user, go to login
        if (!user) {
          window.location.href = '/login';
          return;
        }
    
        // we have a user → fetch exercises from backend
        fetchExercises();
      }, [loading, user]);
  

  return (
    <>
      <NavBar />
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold text-purple-800 mb-6 flex items-center gap-2">
          🧠 <span>Your <span className="text-purple-600">Exercises</span></span>
        </h1>

        {/* LEFT SIDEBAR DROPDOWN */}
        <div className="w-full flex justify-start">
          <div className="w-[350px]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-indigo-100 text-indigo-800 font-semibold py-2 px-4 rounded-lg shadow hover:bg-indigo-200 text-left"
            >
              ▶ STORIES ({exercises.length})
            </button>

            {dropdownOpen && (
              <div className="mt-2 space-y-4">
                {exercises.map((exercise) => (
                  <div
                    key={exercise.id}
                    className="border border-indigo-200 rounded-lg shadow bg-white/90 backdrop-blur-md"
                  >
                    <button
                      onClick={() =>
                        setOpenStoryId(openStoryId === exercise.id ? null : exercise.id)
                      }
                      className="w-full text-left px-4 py-3 font-semibold text-indigo-700 hover:bg-indigo-100 transition flex justify-between items-center"
                    >
                      <span>
                        📄 <span className="underline">{exercise.story.title}</span> —{' '}
                        {new Date(exercise.created_at).toLocaleString()}
                      </span>
                      <span>{openStoryId === exercise.id ? '▲' : '▼'}</span>
                    </button>

                    {openStoryId === exercise.id && (
                      <div className="px-4 pb-4 space-y-2">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {exercise.story.content}
                        </p>
                        <p className="text-xs italic text-gray-600">
                          Vocabulary: {exercise.story.vocabulary.join(', ')}
                        </p>
                        <div className="flex justify-end">
                          <button
                            className="text-red-600 hover:text-red-800 text-xs underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {exercises.length === 0 && (
                  <p className="text-gray-500 italic mt-4">
                    No exercises found. Try generating a story first!
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
