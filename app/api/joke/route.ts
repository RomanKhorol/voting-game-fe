import { JokeType } from "@/models/jokeType";
import { getRandomJoke } from "@/utils/getRandomJoke";
import { loadJokes } from "@/utils/loadJokes";
const DEFAULT_AVAILABLE_VOTES = ["😂", "👍", "❤️"];

export async function GET() {
  try {
    const response = await fetch('http://localhost:5000/api/jokes')

    if (!response.ok) {
      throw new Error(`Failed to fetch jokes: ${response.statusText}`)
    }

    const jokes = await response.json()

    if (!Array.isArray(jokes) || jokes.length === 0) {
      throw new Error('No jokes available')
    }

    const randomJoke = getRandomJoke(jokes)
    return new Response(JSON.stringify(randomJoke), { status: 200 })
  } catch (error) {
    console.error('Error fetching jokes:', error)
    return new Response(JSON.stringify({ message: 'Internal server error' }), {
      status: 500,
    })
  }
}


export async function POST() {
    try {
      const jokes = await loadJokes(1);
      if (!jokes) {
        throw new Error("Не удалось получить шутки из внешнего API");
      }
   
        for (const joke of jokes) {
  const { question, answer } = joke;

  
  const checkResponse = await fetch("http://localhost:5000/api/jokes");
  const existingJokes = await checkResponse.json();

  const jokeExists = existingJokes.some(
    (existingJoke:JokeType) =>
      existingJoke.question === question && existingJoke.answer === answer
  );

 
  if (!jokeExists) {
    const postResponse = await fetch("http://localhost:5000/api/jokes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        answer,
        votes: DEFAULT_AVAILABLE_VOTES.map((emoji) => ({
          label: emoji,
          value: 0,
        })),
        availableVotes: DEFAULT_AVAILABLE_VOTES,
      }),
    });

    if (!postResponse.ok) {
      console.error(`Не удалось добавить шутку: ${question}`);
    }
  }
}

return new Response(JSON.stringify({ message: "Шутки успешно загружены" }), {
  status: 201,
});
  
    
  } catch (error) {
      console.log(error)
  }
}