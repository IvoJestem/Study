import "./Form.css";
import "./PlayerTable.css"; // Ensure this path is correct based on your project structure
import { Player } from "../../components/Database/Database";

interface PlayerTableProps {
  players: Player[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Imię</th>
          <th>Pozycja</th>
          <th>Wiek</th>
          <th>Narodowość</th>
          <th>Klub</th>
          <th>Cena</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.name}>
            <td>{player.name}</td>
            <td>{player.position}</td>
            <td>{player.age}</td>
            <td>{player.nation}</td>
            <td>{player.club}</td>
            <td>{player.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlayerTable;
