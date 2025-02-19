import { votesType } from '@/models/jokeType'
import { FC } from 'react'
import React from 'react'

interface Props {
  vote: votesType
  onClick: (voteId: string) => void
  selectedVoteId: string | null 
}

const CustomBtn: FC<Props> = ({ vote, onClick, selectedVoteId }) => {
  const isSelected = selectedVoteId === vote._id 

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => onClick(vote._id)}
        className={`px-4 py-2 rounded-lg transition-colors ${
          isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        } hover:bg-blue-400`}
      >
        {vote.label}
      </button>
      <p className={`mt-1 ${isSelected ? 'text-blue-500' : 'text-gray-600'}`}>
        {vote.value}
      </p>
    </div>
  )
}

export default CustomBtn
