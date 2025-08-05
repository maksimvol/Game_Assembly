import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { IMath } from "../../types/types";
import { deleteMathById, getMath } from "../../util_math";
import MathHeaders from "../Maths/MathHeaders";
import DisplayMathInfo from "./DisplayMathComponents";

const MathChosenComponent: React.FC<{ user: any }> = ({ user }) => {
    const [mathList, setMathList] = useState<IMath[]>([])

    const navigate = useNavigate(); 

    useEffect(() => {
        getMath()
        .then(data => {
            setMathList(data)
        })
        .catch(error => {
          console.log("Error fetching math: ", error);
        })
      },[])

    let {mathId} = useParams()
    let currentMathId = Number(mathId)
    const currentMath: IMath | undefined | null = mathList.find((mathV: IMath) => mathV.mathId === currentMathId)

    async function handleDelete() {
        try{
            await deleteMathById(currentMathId);
            navigate('/')
            navigate(0)
        } catch(error) {
            console.log("Error deleting app: ", error);
        }
    }
    
    if (!currentMath) return <></>;

    return(
        <div className="main">
            <h2>Math Info</h2>
            <table>
                <thead>
                    <MathHeaders key={'MathHeaders'}/>
                </thead>
                <tbody>
                    <DisplayMathInfo math={currentMath} />
                </tbody>
            </table>
            <br />
            {user?.role === 'admin' && (
                <div className="game-card">
                    <Link className="button" to={`/chosenMathUpdate/${currentMathId}`}>
                        Update {currentMath.mathName} Math
                    </Link>
                    <button type="button" className="buttonDelete" onClick={handleDelete}>Delete {currentMath.mathName} Math</button>
                </div>
            )}
        </div>
    );
};
export default MathChosenComponent;