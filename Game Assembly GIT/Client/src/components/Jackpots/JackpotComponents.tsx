import React, { useEffect, useState } from "react";
import DisplayJackpotInfo from "./DisplayJackpotComponents";
import JackpotHeaders from "./JackpotHeaders";
import { IApp, IJackpot } from "../../types/types";
import { getJackpot } from "../../util_jackpot";
import { getApp } from "../../util_app";
import { Link } from "react-router-dom";

const JackpotComponent: React.FC = () => {
    const [jackpotList, setJackpotList] = useState<IJackpot[]>([])
    const [appList, setAppList] = useState<IApp[]>([])
    const [sortByName, setSortByName] = useState<boolean>(false);
    const jackpotValues = Object.values(jackpotList);

    useEffect(() => {
        getJackpot()
        .then(jackpotData => {
            if (sortByName) {
                jackpotData.sort((a: IJackpot, b: IJackpot) => a.jackpotName.localeCompare(b.jackpotName));
            }
            setJackpotList(jackpotData)
        })
        .catch(error => {
          console.log("Error fetching jackpot: ", error);
        })

        getApp()
        .then(data => {
            setAppList(data)
        })
        .catch(error => {
          console.log("Error fetching app: ", error);
        })
      },[sortByName])

    const nameSort = () => {
        setSortByName(prev => !prev);
    };

    return (
        <div>
        <div className="controls">
        <button className="button" onClick={() => setSortByName(s => !s)}>
          {sortByName ? "Reset Sorting" : "Sort By Name"}
        </button>
        </div>
        <div className="card-container">
                    {jackpotValues.map(jackpot => (
                      <div key={jackpot.jackpotId} className="game-card">
                        <h3>
                          <Link to={`/chosenJackpot/${jackpot.jackpotId}`}>{jackpot.jackpotName}</Link>
                        </h3>
                        <p><b>Jackpot Name:</b> {jackpot.jackpotName}</p>
                        <p><b>Type:</b> {jackpot.jackpotType}</p>
                        <p><b>Percentage Set List:</b> {jackpot.percentageSetList}</p>
                      </div>
                    ))}
                  </div>
                </div>
    );
};

export default JackpotComponent;
