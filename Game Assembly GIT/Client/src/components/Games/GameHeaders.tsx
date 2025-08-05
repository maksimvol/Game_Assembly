import { Link } from "react-router-dom";

const GameHeaders = ({headerValues}: any): JSX.Element => {
    return(
        <tr className="table">
            {
                Object.values(headerValues).map((headerValue: any, index)=>{
                    if(Array.isArray(headerValue)){
                        return <th key={'hVal'+index}>
                                    <Link to={`/chosenApp/${headerValue[1]}`} className="appHeader">
                                        {headerValue[0] }
                                    </Link>
                                 </th> 
                    } else {
                        return<th key={'hVal'+index}>{headerValue}</th> 
                    }

                })
            }
        </tr>
    )
}
export default GameHeaders;