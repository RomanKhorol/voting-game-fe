import Link from "next/link"
import { Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "Voting Game | Main Page",
  description: "Generated by create next app",
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 sm:px-12">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Welcome to the Voting Game
        </h1>
        <p className="text-lg text-gray-700">Lots of funny jokes await you!</p>
      </header>

      <main>
        <Link
          href="/joke"
          className="px-6 py-3 text-lg font-medium bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Let is start
        </Link>
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        © 2025 Created by Gordiienko
      </footer>
    </div>
  )
}
