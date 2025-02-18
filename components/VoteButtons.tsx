
"use client";

import { votesType } from "@/models/jokeType";
import React, {  useState } from "react";
import CustomBtn from "./CustomBtn";

interface VoteButtonsProps {
  id: string;
  votes: votesType[];
  
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ votes, id }) => {
  const [votesState, setVotes] = useState<votesType[]>(votes);
  const [selectedVoteId, setSelectedVoteId] = useState<string | null>(null);

  const handleVote = (voteId: string) => {
    setVotes((prevVotes) =>
      prevVotes.map((vote) => {
        if (vote._id === voteId) {
          if (selectedVoteId === voteId) {
            setSelectedVoteId(null);
            return { ...vote, value: vote.value - 1 };
          } else {
            setSelectedVoteId(voteId);
            return { ...vote, value: vote.value + 1 };
          }
        } else if (vote._id === selectedVoteId) {
          return { ...vote, value: vote.value - 1 };
        }
        return vote;
      })
    );

    
  };
    return (
      <div>
        {votesState.map((vote) => (
          <CustomBtn key={vote._id} vote={vote} onClick={handleVote} />
        ))}
        <button>Next Joke</button>
      </div>
    );
  };

export default VoteButtons;
