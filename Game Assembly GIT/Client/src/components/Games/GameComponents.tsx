import React, { useEffect, useState } from "react";
import DisplayGameInfo from "./DisplayGameComponents";
import GameHeaders from "./GameHeaders";
import { CompoundTableHeaders } from "../Data/Headers";
import { IApp, IGameModed, IMath } from "../../types/types";
import { getGame } from "../../util_game";
import { getApp } from "../../util_app";
import { getMath } from "../../util_math";
import { Link } from "react-router-dom";

const GameComponent: React.FC = () => {

    const [gameList, setGameList] = useState<IGameModed[]>([])
    const [appList, setAppList] = useState<IApp[]>([])
    const [math, setMath] = useState<IMath[]>([])
    const [sortByName, setSortByName] = useState<boolean>(false);
    const [filterFreegames, setFilterFreegames] = useState<boolean>(false);
    const [filterGamble, setFilterGamble] = useState<boolean>(false);
    const [filterJackpot, setFilterJackpot] = useState<boolean>(false);


    useEffect(() => {
        getGame()
        .then(gameData => {
            if (sortByName) {
                gameData.sort((a: IGameModed, b: IGameModed) => a.gameName.localeCompare(b.gameName));
            }
          setGameList(gameData)
        })
        .catch(error => {
          console.log("Error fetching game: ", error);
        })

        getApp()
        .then(appData => {
            setAppList(appData)
        })
        .catch(error => {
          console.log("Error fetching app: ", error);
        })

        getMath()
        .then(mathData => {
            setMath(mathData)
        })
        .catch(error => {
          console.log("Error fetching math: ", error);
        })
      },[sortByName])

    let headerValue = Object(CompoundTableHeaders);

    appList.forEach((appList)=>{
        let v  = appList.appName;
        let n = 'app'+appList.gameSetId;
        headerValue[n] = [v, appList.gameSetId];
    })

    const processedGames = gameList.map(game => {
        game['MathName'] = math.find(e => e.mathId === game.mathId)?.mathName ?? 'No Math Attached'

        appList.forEach((appList)=>{            
            let n = 'app' + appList.gameSetId;
            game[n] =  appList.gameList.find((e)=>e.gameId === game.gameId) ? true : false;
        });
        return {...game}

    })

    const nameSort = () => {
        setSortByName(prev => !prev);
    };
    const toggleFilterFreegames = () => {
        setFilterFreegames(prev => !prev);
    };
    const toggleFilterGamble = () => {
        setFilterGamble(prev => !prev);
    };
    const toggleFilterJackpot = () => {
        setFilterJackpot(prev => !prev);
    };

    const filteredGames = processedGames.filter(game =>
        (!filterFreegames || game.freegames) &&
        (!filterGamble || game.gamble) &&
        (!filterJackpot || game.jackpot)
    );

    return (
    <div>
      <div className="controls">
        <button className="button" onClick={() => setSortByName(s => !s)}>
          {sortByName ? "Reset Sorting" : "Sort By Name"}
        </button>
        <label>
          <input
            type="checkbox"
            checked={filterFreegames}
            onChange={() => setFilterFreegames(f => !f)}
          />{" "}
          Only Freegames
        </label>
        <label>
          <input
            type="checkbox"
            checked={filterGamble}
            onChange={() => setFilterGamble(f => !f)}
          />{" "}
          Only Gamble
        </label>
        <label>
          <input
            type="checkbox"
            checked={filterJackpot}
            onChange={() => setFilterJackpot(f => !f)}
          />{" "}
          Only Jackpot
        </label>
      </div>

      <div className="card-container">
        {filteredGames.map(game => (
          <div key={game.gameId} className="game-card">
            <h3>
              <Link to={`/chosenGame/${game.gameId}`}>{game.gameName}</Link>
            </h3>
            <p><b>Math:</b> {game.MathName}</p>
            <p><b>Freegames:</b> {game.freegames ? "✅" : "❌"}</p>
            <p><b>Gamble:</b> {game.gamble ? "✅" : "❌"}</p>
            <p><b>Jackpot:</b> {game.jackpot ? "✅" : "❌"}</p>
            <p><b>Apps:</b></p>
            <div className="app-flags">
              {appList.map(app => {
                const hasGame = game[`app${app.gameSetId}`];
                return (
                  <Link
                    key={app.gameSetId}
                    to={`/chosenApp/${app.gameSetId}`}
                    className={`app-flag ${hasGame ? "active" : "inactive"}`}
                    title={app.appName}
                  >
                    {app.appName}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default GameComponent;