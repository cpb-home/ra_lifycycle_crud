import React from "react";

interface IButton {
  className?: string
  title?: string;
  btnType: 'submit' | 'reset' | 'button';
  cardId?: number;
  func?: React.MouseEventHandler 
}

const Button = ({ className, title, btnType, cardId, func }: IButton) => {
  return (
    <button className={"button button_" + className} name={String(cardId)} type={btnType} onClick={func}>
      {title}
    </button>
  )
}

export default Button
