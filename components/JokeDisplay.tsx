import { JokeType } from "@/models/jokeType";
import VoteButtons from "./VoteButtons";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function getJoke(): Promise<JokeType> {
  try {
    const response = await fetch(`${apiUrl}/joke`);
    if (!response.ok) {
      throw new Error("Failed to fetch jokes");
    }
    const joke: JokeType = await response.json(); 
    return joke;
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


