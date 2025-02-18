import { votesType } from "@/models/jokeType";
import { FC } from "react";
interface Props {
  vote: votesType;
  onClick: (voteId: string) => void;
}
const CustomBtn: FC<Props> = ({vote, onClick}) => {
  return (
    <div>
      <button onClick={() => onClick(vote._id)}>{vote.label}</button>
      <p>{vote.value}</p>
    </div>
  );
};
export default CustomBtn;
