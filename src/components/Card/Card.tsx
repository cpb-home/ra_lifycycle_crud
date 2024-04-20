import React from "react";
import Button from "../Button/Button";

interface ICardCont {
  content: string;
  cardId: number;
  func?: React.MouseEventHandler
}

const Card = ({ content, cardId, func }: ICardCont) => {
  return (
    <div className="card">
      <p>{content}</p>
      <Button func={func} className="delete" btnType="button" cardId={cardId} />
    </div>
  )
}

export default Card
