import React from "react";
import { IMath } from "../../types/types";
import { Link } from "react-router-dom";

const DisplayMathInfo: React.FC<{math: IMath}> = ({ math }) => {

    return(
        <tr className="table">
            <td>
                <Link to={`/chosenMath/${math.mathId}`}>
                    {math.mathName}
                </Link>
            </td>
            <td>{math.percentage.join(", ")}</td>
            <td>{math.percentageSetList.join(", ")}</td>
        </tr>
    );
};

export default DisplayMathInfo;