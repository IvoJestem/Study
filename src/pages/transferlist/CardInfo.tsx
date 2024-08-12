import React from "react";
import "./CardInfo.css";

interface PlayerInfoProps {
  name: string;
  position: string;
  age: number;
  nation: string;
  club: string;
  price: string;
}

export const CardInfo: React.FC<PlayerInfoProps> = ({
  name,
  position,
  age,
  nation,
  club,
  price,
}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{position}</td>
      <td>{age}</td>
      <td>{nation}</td>
      <td>{club}</td>
      <td>{price}</td>
    </tr>
  );
};
