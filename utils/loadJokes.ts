const API_URL = "https://teehee.dev/api/joke";

async function fetchJoke() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }
  return response.json();
}

export async function loadJokes(count: number) {
  const jokes = new Map<string, { question: string; answer: string }>();

  while (jokes.size < count) {
    const joke = await fetchJoke();

    if (!jokes.has(joke.id)) {
      jokes.set(joke.id, { question: joke.question, answer: joke.answer });
    }
  }

  return Array.from(jokes.values());
}
