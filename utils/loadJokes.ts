const API_URL = "https://teehee.dev/api/joke";

async function fetchJoke() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch joke");
  }
  return response.json();
}

export async function loadJokes(count: number) {
  const jokes = new Set(); 
  while (jokes.size < count) {
    const joke = await fetchJoke();
    const jokeKey = `${joke.question}|${joke.answer}`; 
    jokes.add(jokeKey);
  }
  return Array.from(jokes);
}
