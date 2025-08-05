import { IApp } from "../../types/types";
import "../Style/style.css";

const DisplayAppInfo: React.FC<{app: IApp}> = ({ app }) => {
    return(
            <tr className="table">
                <td>{app.appName}</td>
                <td>{app.gameSetId}</td>
                <td>{app.region}</td>
                <td>{app.interface}</td>
            </tr>
    )}

export default DisplayAppInfo;