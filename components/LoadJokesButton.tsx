"use client"
import React from "react"
import { useState } from "react"
import { toast } from "react-toastify"

export default function LoadJokesButton() {
  const [loading, setLoading] = useState(false)

  const loadJokes = async () => {
    setLoading(true)

    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
      const response = await fetch(`${apiUrl}/joke`, {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Ошибка загрузки шуток")
      }

      toast.success("New jokes have loaded !!!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <button
        onClick={loadJokes}
        disabled={loading}
        className="px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        {loading ? "Загружаем..." : "Load More Jokes"}
      </button>
    </div>
  )
}
