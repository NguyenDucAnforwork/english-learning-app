const API_URL = 'http://localhost:8000'; // backend URL

export interface User {
  id: number;
  email: string;
  full_name: string;
}

export interface VocabularyContext {
  context: string;
  word: string;
  options: string[];
  correct_answer: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export const register = async (email: string, password: string, full_name: string): Promise<User> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, full_name }),
  });

  if (!response.ok) {
    throw new Error('Registration failed');
  }

  return response.json();
};

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  const response = await fetch(`${API_URL}/token`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user info');
  }

  return response.json();
};

export async function getVocabularyContext(token: string) {
  const response = await fetch('http://localhost:8000/vocabulary/context', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch vocabulary context');
  }

  return response.json();
}
