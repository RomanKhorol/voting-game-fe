import { getRandomJoke } from "@/utils/getRandomJoke";
import { NextResponse } from "next/server";
const DEFAULT_AVAILABLE_VOTES = ["😂", "👍", "❤️"];

export async function GET() {
  try {
    const response = await fetch("http://localhost:5000/api/jokes");

    if (!response.ok) {
      throw new Error(`Failed to fetch jokes: ${response.statusText}`);
    }

    const jokes = await response.json();

    if (!Array.isArray(jokes) || jokes.length === 0) {
      throw new Error("No jokes available");
    }

    const randomJoke = getRandomJoke(jokes);
    return new Response(JSON.stringify(randomJoke), { status: 200 });

  } catch (error) {
    console.error("Error fetching jokes:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        { message: "Question and answer are required" },
        { status: 400 }
      );
    }

    
    const votes = DEFAULT_AVAILABLE_VOTES.map((emoji) => ({
      label: emoji,
      value: 0,
    }));

  
    const response = await fetch("http://localhost:5000/api/jokes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        answer,
        votes,
        availableVotes: DEFAULT_AVAILABLE_VOTES,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add joke");
    }

    const newJoke = await response.json();
    return NextResponse.json(newJoke, { status: 201 });
  } catch (error) {
      console.error("Error adding joke:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}