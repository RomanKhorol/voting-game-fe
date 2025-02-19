import { JokeType } from "@/models/jokeType"

export function getRandomJoke(jokes: JokeType[]) {
  const randomIndex = Math.floor(Math.random() * jokes.length)
  return jokes[randomIndex]
}
