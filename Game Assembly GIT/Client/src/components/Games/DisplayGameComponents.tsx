import "../Style/style.css";
import { Link } from "react-router-dom";

const DisplayGameInfo = ({game}:any) : JSX.Element => {   

    return (
    <tr className="table">
      {Object.keys(game).map((key, index) => {
        if (key === "_id" || key === "gameId" || key === "mathId" || key === "systemId" || key === "__v" || key === "gameAdded") return null;
        
        const isBoolean = typeof game[key] === "boolean";
        const setID = key.includes("app") ? key.split("app").pop() : undefined;

        let cellData;

        if(key === "gameName") {
          const val = game[key];
          cellData = <Link to={`/chosenGame/${game.gameId}`}>{val}</Link>
        } else {

          if (isBoolean) {
            const val = game[key] ? "*" : "";
            cellData = setID ? <Link to={`/chosenApp/${setID}`}>{val}</Link> : val;
          } else if (key === "gameVersion") {
            cellData = game[key].join(" | ");
          } else {
            cellData = game[key];
          }
        }
          return (
            <td
              key={game.gameName + "cell" + index}
              className={isBoolean ? (game[key] ? "green" : "red") : ""}
            >
              {cellData}
            </td>
          );
      })}
    </tr>
  );
};

export default DisplayGameInfo;