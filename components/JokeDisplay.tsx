import { JokeType } from "@/models/jokeType";
import VoteButtons from "./VoteButtons";
import { getRandomJoke } from "@/utils/getRandomJoke";
async function getJoke(): Promise<JokeType> {
  try {
    const response = await fetch("http://localhost:5000/api/jokes");
    if (!response.ok) {
      throw new Error("Failed to fetch jokes");
    }
    const jokes = await response.json();
    const randomJoke = getRandomJoke(jokes);
    return {
      ...randomJoke,
      votes: randomJoke.votes ?? [],
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return { id: "", question: "", answer: "", votes: [] };
  }
}

export default async function JokeDisplay() {
  const joke = await getJoke();
  return (
    <div className="joke-container">
      <h2>{joke.question}</h2>
      <p>{joke.answer}</p>
      <VoteButtons votes={joke.votes} id={joke.id} />
    </div>
  );
};


