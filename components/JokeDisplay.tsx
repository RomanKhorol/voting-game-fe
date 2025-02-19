import { JokeType } from "@/models/jokeType";
import React from 'react'
import VoteButtons from "./VoteButtons";
import LoadJokesButton from "./LoadJokesButton";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
async function getJoke(): Promise<JokeType> {
  try {
    const response = await fetch(`${apiUrl}/joke`)
    if (!response.ok) {
      throw new Error('Failed to fetch jokes')
    }
    const joke: JokeType = await response.json()
    return joke
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    return { _id: '', question: '', answer: '', votes: [] }
  }
}

export default async function JokeDisplay() {
  let currentJoke = await getJoke()

  if (!currentJoke) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700">
          No jokes available
        </h2>
        <LoadJokesButton />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {currentJoke.question}
      </h2>
      <p className="text-lg text-gray-600 mb-4">{currentJoke.answer}</p>
      <VoteButtons votes={currentJoke.votes} id={currentJoke._id} />
      <LoadJokesButton />
    </div>
  )
}



