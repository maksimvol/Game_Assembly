import React, { useEffect, useState } from "react";
import { IApp, IJackpot } from "../../types/types";
import "../Style/style.css";
import { Link } from "react-router-dom";
import { getApp } from "../../util_app";

const DisplayJackpotInfo: React.FC<{jackpot: IJackpot}> = ({ jackpot }) => {
    const [appList, setAppList] = useState<IApp[]>([])

    useEffect(() => {
        getApp()
        .then(data => {
            setAppList(data)
        })
        .catch(error => {
          console.log("Error fetching app: ", error);
        })
      },[])
    return(
        <tr className="table">
            <td>
                <Link to={`/chosenJackpot/${jackpot.jackpotId}`}>
                    {jackpot.jackpotName}
                </Link>
            </td>
            <td>{jackpot.jackpotType}</td>
            <td>{jackpot.percentageSetList}</td>
        </tr>
    );
};

export default DisplayJackpotInfo;