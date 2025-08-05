import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IJackpot } from "../../types/types";
import { deleteJackpotById, getJackpot } from "../../util_jackpot";
import JackpotHeaders from "./JackpotHeaders";
import DisplayJackpotInfo from "./DisplayJackpotComponents";

const JackpotChosenComponent: React.FC<{ user: any }> = ({ user }) => {
    const [jackpotList, setJackpotList] = useState<IJackpot[]>([])

    const navigate = useNavigate(); 

    useEffect(() => {
        getJackpot()
        .then(data => {
            setJackpotList(data)
        })
        .catch(error => {
          console.log("Error fetching jackpot: ", error);
        })
      },[])

    let {jackpotId} = useParams()
    let currentJackpotId = Number(jackpotId)
    const currentJackpot: IJackpot | undefined | null = jackpotList.find((jackpotV: IJackpot) => jackpotV.jackpotId === currentJackpotId)

    async function handleDelete() {
        try{
            await deleteJackpotById(currentJackpotId);
            navigate('/')
            navigate(0)
        } catch(error) {
            console.log("Error deleting app: ", error);
        }
    }
    
    if (!currentJackpot) return <></>;

    return(
        <div className="main">
            <h2>Jackpot Info</h2>
            <table>
                <thead>
                    <JackpotHeaders key={'JackpotHeaders'} />
                </thead>
                <tbody>
                    <DisplayJackpotInfo jackpot={currentJackpot} />
                </tbody>
            </table>
            <br />
            {user?.role === 'admin' && (
                <div>
                <Link className="button" to={`/chosenJackpotUpdate/${currentJackpotId}`}>
                    Update {currentJackpot.jackpotName} Jackpot
                </Link>
                <button type="button" className="buttonDelete" onClick={handleDelete}>Delete {currentJackpot.jackpotName} Jackpot</button>
            </div>
            )}
            </div>
    );
};
export default JackpotChosenComponent;