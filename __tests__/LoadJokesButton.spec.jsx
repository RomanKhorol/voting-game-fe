import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoadJokesButton from "../components/LoadJokesButton"
import { toast } from "react-toastify"

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe("LoadJokesButton", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('рендерит кнопку с текстом "Load More Jokes"', () => {
    render(<LoadJokesButton />)
    expect(screen.getByText("Load More Jokes")).toBeInTheDocument()
  })

  it("вызывает API и отображает toast при успешной загрузке", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Jokes loaded" }),
      })
    )

    render(<LoadJokesButton />)
    const button = screen.getByText("Load More Jokes")

    fireEvent.click(button)

    expect(button).toBeDisabled()

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("New jokes have loaded !!!")
    })

    expect(button).not.toBeDisabled()
  })

  it("отображает toast с ошибкой при неудачном запросе", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Ошибка загрузки шуток" }),
      })
    )

    render(<LoadJokesButton />)
    fireEvent.click(screen.getByText("Load More Jokes"))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Ошибка загрузки шуток")
    })
  })

  it('отображает toast с "Unknown error", если нет сообщения ошибки', async () => {
    global.fetch = jest.fn(() => Promise.reject({}))

    render(<LoadJokesButton />)
    fireEvent.click(screen.getByText("Load More Jokes"))

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Unknown error")
    })
  })
})
