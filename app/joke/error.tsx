"use client"

import React from "react"
import { useRouter } from "next/navigation"

const ErrorWrapper = ({ error }: { error: Error }) => {
  const router = useRouter()
  const handleBack = () => {
    router.push("/")
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Oops !!! Unable to find joke: {error.message}
      </h2>
      <button
        onClick={handleBack}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Home Page
      </button>
    </div>
  )
}

export default ErrorWrapper
