import { IApp } from "../../types/types";

const AppHeaders: React.FC<{ app: IApp[] }> = ({ app }) => {
    return(
        <tr className="table">
            <th>App Name</th>
            <th>Game Set Id</th>
            <th>Region</th>
            <th>Interface</th>
        </tr>
    )
}
export default AppHeaders;