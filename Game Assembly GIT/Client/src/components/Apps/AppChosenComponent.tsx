import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IApp, IGameModed, IJackpot, IMath } from "../../types/types";
import { CompoundTableHeaders } from "../Data/Headers";
import GameHeaders from "../Games/GameHeaders";
import DisplayGameInfo from "../Games/DisplayGameComponents";
import DisplayJackpotInfo from "../Jackpots/DisplayJackpotComponents";
import JackpotHeaders from "../Jackpots/JackpotHeaders";
import DisplayAppInfo from "./DisplayAppComponents";
import AppHeaders from "./AppHeaders";
import { deleteAppById, getApp } from "../../util_app";
import { getGame } from "../../util_game";
import { getJackpot } from "../../util_jackpot";
import { getMath } from "../../util_math";

const AppChosenComponent: React.FC<{ user: any }> = ({ user }) => {
    const [gameList, setGameList] = useState<IGameModed[]>([])
    const [jackpotList, setJackpotList] = useState<IJackpot[]>([])
    const [appList, setAppList] = useState<IApp[]>([])
    const [math, setMath] = useState<IMath[]>([])
    const [sortByName, setSortByName] = useState<boolean>(false);

    const navigate = useNavigate(); 

    useEffect(() => {
        getApp()
        .then(appData => {
            setAppList(appData)
        })
        .catch(error => {
          console.log("Error fetching app: ", error);
        })

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

        getJackpot()
        .then(jackpotData => {
            setJackpotList(jackpotData)
        })
        .catch(error => {
          console.log("Error fetching jackpot: ", error);
        })

        getMath()
        .then(mathData => {
            setMath(mathData)
        })
        .catch(error => {
          console.log("Error fetching math: ", error);
        })
      },[sortByName])

    let {setId} = useParams()
    let currentAppId = Number(setId)
    const currentApp: IApp | undefined | null = appList.find((appV: IApp) => appV.gameSetId === currentAppId)

    async function handleDelete() {
        try{
            await deleteAppById(currentAppId);
            navigate('/')
            navigate(0)
        } catch(error) {
            console.log("Error deleting app: ", error);
        }
    }
    
    if (!currentApp) return <></>;

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

    const filteredJackpots = jackpotList.filter(jackpot => 
        jackpot.jackpotId === currentApp.jackpotId
    );

    const nameSort = () => {
        setSortByName(prev => !prev);
    };

    return(
        <div className="main">
            <h2>App Name: {currentApp.appName}</h2>
            <h2>App Info</h2>
            <table>
                <thead>
                    <AppHeaders key={'AppHeaders'} app={appList}/>
                </thead>
                <tbody>
                    <DisplayAppInfo app={currentApp} />
                </tbody>
            </table>
            <br />
            {user?.role === 'admin' && (
                <div>
                <Link className="button" to={`/chosenAppUpdate/${currentAppId}`}>
                    Update {currentApp.appName} App
                </Link>
                <button type="button" className="buttonDelete" onClick={handleDelete}>Delete {currentApp.appName} App</button>
            </div> 
            )}
            <h2>Jackpot Info</h2>
            <table>
                <thead>
                    <JackpotHeaders key={'JackpotHeaders'} />
                </thead>
                <tbody>
                    {filteredJackpots.map((jackpot, index) => (
                        <DisplayJackpotInfo key={"jackpot" + index} jackpot={jackpot} />
                    ))}
                </tbody>
            </table>
            <h2>Games Info</h2>
            <button className="button" onClick={nameSort}>Sort by Name</button><br />
            <br />
            <table>
                <thead>
                    <GameHeaders key={'GamesListHeaders'} headerValues={headerValue}/>
                </thead>
                <tbody>
                    {
                    processedGames.map((game, index) => (
                        <DisplayGameInfo key={"game" + index} game={game} />
                      ))
                    }
                </tbody>
            </table>
            
        </div>
    );
};
export default AppChosenComponent;