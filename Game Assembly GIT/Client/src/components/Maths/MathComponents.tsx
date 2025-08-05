import React, { useEffect, useState } from "react";
import { IMath } from "../../types/types";
import { getMath } from "../../util_math";
import MathHeaders from "./MathHeaders";
import DisplayMathInfo from "./DisplayMathComponents";
import { Link } from "react-router-dom";

const MathComponent: React.FC = () => {
    const [mathList, setMathList] = useState<IMath[]>([])
    const [sortByName, setSortByName] = useState<boolean>(false);
    const mathValues = Object.values(mathList);

    useEffect(() => {
        getMath()
        .then(mathData => {
            if (sortByName) {
                mathData.sort((a: IMath, b: IMath) => a.mathName.localeCompare(b.mathName));
            }
            setMathList(mathData)
        })
        .catch(error => {
          console.log("Error fetching math: ", error);
        })
      },[sortByName])

    const nameSort = () => {
        setSortByName(prev => !prev);
    };

    return(
        <div>
        <div className="controls">
        <button className="button" onClick={() => setSortByName(s => !s)}>
          {sortByName ? "Reset Sorting" : "Sort By Name"}
        </button>
        </div>
        {/* <table>
            <thead>
                <MathHeaders />
            </thead>
            <tbody>
                {mathValues.map((math: any, index) => (
                    <DisplayMathInfo key={"math" + index} math={math} />
                ))}
            </tbody>
        </table> */}
     <div className="card-container">
            {mathValues.map(math => (
              <div key={math.mathId} className="game-card">
                <h3>
                  <Link to={`/chosenMath/${math.mathId}`}>{math.mathName}</Link>
                </h3>
                <p><b>Math Name:</b> {math.mathName}</p>
                <p><b>Percentage:</b> {math.percentage}</p>
                <p><b>Percentage Set List:</b> {math.percentageSetList}</p>
              </div>
            ))}
          </div>
        </div>
      );
    };
export default MathComponent;