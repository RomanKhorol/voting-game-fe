import fetch from "jest-fetch-mock"
import { loadJokes } from "../utils/loadJokes"

beforeEach(() => {
  fetch.resetMocks()
})

describe("loadJokes", () => {
  it("должен загрузить указанное количество уникальных шуток", async () => {
    const mockJokes = [
      { id: "1", question: "Шутка 1?", answer: "Ответ 1" },
      { id: "2", question: "Шутка 2?", answer: "Ответ 2" },
      { id: "3", question: "Шутка 3?", answer: "Ответ 3" },
    ]

    fetch.mockResponseOnce(JSON.stringify(mockJokes[0]))
    fetch.mockResponseOnce(JSON.stringify(mockJokes[1]))
    fetch.mockResponseOnce(JSON.stringify(mockJokes[2]))

    const jokes = await loadJokes(3)
    expect(jokes).toHaveLength(3)
    jokes.forEach((joke) => {
      expect(joke).toHaveProperty("question")
      expect(joke).toHaveProperty("answer")
    })
  })

  it("должен повторно запрашивать шутки, пока не будет достигнуто указанное количество уникальных шуток", async () => {
    const mockJokes = [
      { id: "1", question: "Шутка 1?", answer: "Ответ 1" },
      { id: "2", question: "Шутка 2?", answer: "Ответ 2" },
      { id: "3", question: "Шутка 3?", answer: "Ответ 3" },
    ]

    fetch.mockResponseOnce(JSON.stringify(mockJokes[0]))
    fetch.mockResponseOnce(JSON.stringify(mockJokes[0])) // Дубликат
    fetch.mockResponseOnce(JSON.stringify(mockJokes[1]))
    fetch.mockResponseOnce(JSON.stringify(mockJokes[2]))

    const jokes = await loadJokes(3)
    expect(jokes).toHaveLength(3)
    jokes.forEach((joke) => {
      expect(joke).toHaveProperty("question")
      expect(joke).toHaveProperty("answer")
    })
  })
})
