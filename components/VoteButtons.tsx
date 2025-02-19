
"use client";
import { useRouter } from "next/navigation";
import { votesType } from "@/models/jokeType";
import React, {  useState } from "react";
import CustomBtn from "./CustomBtn";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface VoteButtonsProps {
  id: string;
  votes: votesType[];
  
}

const VoteButtons: React.FC<VoteButtonsProps> = ({ votes, id }) => {
  const [votesState, setVotes] = useState<votesType[]>(votes);
  const [selectedVoteId, setSelectedVoteId] = useState<string | null>(null);
  const router = useRouter();

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
  const handleSubmit = async (id: string) => {
    console.log(id);
    try {
      const response = await fetch(`${apiUrl}/joke/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ votes: votesState }),
      });

      if (!response.ok) {
        console.log("Cannot update joke votes");
        const error = await response.json();
        throw new Error(error.error || "Cannot update joke votes");
      }

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
    return (
      <div>
        {votesState.map((vote) => (
          <CustomBtn key={vote._id} vote={vote} onClick={handleVote} />
        ))}
        <button onClick={() => handleSubmit(id)}>Next Joke</button>
      </div>
    );
  };

export default VoteButtons;
