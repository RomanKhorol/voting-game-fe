import JokeDisplay from "@/components/JokeDisplay"
import { Metadata } from "next"
import Link from "next/link"
import React from "react"

export const metadata: Metadata = {
  title: "Voting Game | Jokes Page",
  description: "List of Jokes",
}

export default async function Joke() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg flex flex-col items-center gap-6">
        <JokeDisplay />

        <Link
          href="/"
          className="px-6 py-3 text-lg font-medium bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 hover:scale-105 transition duration-300 text-center w-full"
        >
          🔙 Back to Main Page
        </Link>
      </div>
    </div>
  )
}
