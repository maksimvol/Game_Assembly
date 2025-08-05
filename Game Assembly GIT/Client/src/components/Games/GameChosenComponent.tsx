import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IGameModed, IMath } from "../../types/types";
import DisplayGameInfo from "../Games/DisplayGameComponents";
import { deleteGameById, getGame } from "../../util_game";
import { getMath } from "../../util_math";
import ChosenGameHeaders from "./ChosenGameHeaders";
import MathHeaders from "../Maths/MathHeaders";
import DisplayMathInfo from "../Maths/DisplayMathComponents";

const GameChosenComponent: React.FC<{ user: any }> = ({ user }) => {
    const [gameList, setGameList] = useState<IGameModed[]>([])
    const [math, setMath] = useState<IMath[]>([])

    const navigate = useNavigate(); 

    useEffect(() => {
        getGame()
        .then(data => {
          setGameList(data)
        })
        .catch(error => {
          console.log("Error fetching game: ", error);
        })

        getMath()
        .then(data => {
            setMath(data)
        })
        .catch(error => {
          
        })
      },[])

    let {gameId} = useParams()
    let currentGameId = Number(gameId)
    const currentGame: IGameModed | undefined | null = gameList.find((gameV: IGameModed) => gameV.gameId === currentGameId)

    async function handleDelete() {
        try{
            await deleteGameById(currentGameId);
            navigate('/')
            navigate(0)
        } catch(error) {
            console.log("Error deleting app: ", error);
        }
    }
    
    if (!currentGame) return <></>;

    const filteredMath = math.filter(math => 
        math.mathId === currentGame.mathId
    );

    return(
        <div>
            <div className="card-container">
                <div key={currentGame.gameId} className="game-card">
                    <h3>
                        <Link to={`/chosenGame/${currentGame.gameId}`}>{currentGame.gameName}</Link>
                    </h3>
                    <p><b>Math:</b> {currentGame.MathName}</p>
                    <p><b>Freegames:</b> {currentGame.freegames ? "✅" : "❌"}</p>
                    <p><b>Gamble:</b> {currentGame.gamble ? "✅" : "❌"}</p>
                    <p><b>Jackpot:</b> {currentGame.jackpot ? "✅" : "❌"}</p>
                    <p><b>Apps:</b></p>
                    <br />
            </div>
            {user?.role === 'admin' && (
            <div className="game-card">
                <Link className="button" to={`/chosenGameUpdate/${currentGameId}`}>
                    Update {currentGame.gameName} Game
                </Link>
                <button type="button" className="buttonDelete" onClick={handleDelete}>Delete {currentGame.gameName} Game</button>
            </div>
            
            )}
            <div className="card-container">
                <div className="game-card">
            <h2>Math Info</h2>
            <table>
                <thead>
                    <MathHeaders key={'MathHeaders'} />
                </thead>
                <tbody>
                    {filteredMath.map((math, index) => (
                        <DisplayMathInfo key={"math" + index} math={math} />
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        </div>
        </div>
    );
};
export default GameChosenComponent;