import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import VoteButtons from "../components/VoteButtons"
import CustomBtn from "../components/CustomBtn"
import { useRouter } from "next/navigation"

jest.mock("../components/CustomBtn", () =>
  jest.fn(({ vote, onClick }) => (
    <button
      data-testid={`vote-btn-${vote._id}`}
      onClick={() => onClick(vote._id)}
    >
      {vote.value}
    </button>
  ))
)

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
)

describe("VoteButtons", () => {
  const mockVotes = [
    { _id: "1", emoji: "😂", value: 5 },
    { _id: "2", emoji: "👍", value: 3 },
  ]
  const mockRouter = { refresh: jest.fn() }

  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter)
    fetch.mockClear()
  })

  test("отрисовывает кнопки голосования", () => {
    render(<VoteButtons votes={mockVotes} id="joke-123" />)

    expect(screen.getByTestId("vote-btn-1")).toBeInTheDocument()
    expect(screen.getByTestId("vote-btn-2")).toBeInTheDocument()
  })

  test("изменяет значение голоса при нажатии", async () => {
    render(<VoteButtons votes={mockVotes} id="joke-123" />)

    const voteButton = screen.getByTestId("vote-btn-1")

    fireEvent.click(voteButton)

    await waitFor(() => {
      expect(voteButton).toHaveTextContent("6")
    })

    fireEvent.click(voteButton)

    await waitFor(() => {
      expect(voteButton).toHaveTextContent("5")
    })
  })

  test("отправляет запрос при нажатии 'Next Joke'", async () => {
    render(<VoteButtons votes={mockVotes} id="joke-123" />)

    fireEvent.click(screen.getByText("Next Joke"))

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/joke/joke-123"),
        expect.objectContaining({
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
        })
      )
    })

    expect(mockRouter.refresh).toHaveBeenCalled()
  })
})
