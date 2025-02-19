
import JokeDisplay from "@/components/JokeDisplay";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Voiting Game | Jokes Page",
  description: "List of Tasks",
};


export default async function Joke() {
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <JokeDisplay/>
        {/* <Link
          href="/"
          className="px-6 py-3 text-lg bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          Back to main Page
        </Link> */}
      </div>
    </div>
  );
}

