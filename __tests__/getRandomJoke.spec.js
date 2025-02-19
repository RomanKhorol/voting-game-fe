import { getRandomJoke } from "../utils/getRandomJoke"

describe("getRandomJoke", () => {
  it("should return a joke from the provided array", () => {
    const jokes = [
      { id: "1", question: "Joke 1?", answer: "Answer 1" },
      { id: "2", question: "Joke 2?", answer: "Answer 2" },
      { id: "3", question: "Joke 3?", answer: "Answer 3" },
    ]

    const result = getRandomJoke(jokes)

    expect(jokes).toContain(result)
  })

  it("should return undefined if the jokes array is empty", () => {
    const jokes = []

    const result = getRandomJoke(jokes)

    expect(result).toBeUndefined()
  })
})
