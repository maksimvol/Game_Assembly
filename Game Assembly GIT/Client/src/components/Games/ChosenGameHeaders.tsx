
const ChosenGameHeaders = (): JSX.Element => {
    return(
        <tr className="table">
            <th>Game Name</th>
            <th>Max Win Line Combination (Main)</th>
            <th>Max Win Line Combination (Freegames)</th>
            <th>Freegames</th>
            <th>Gamble</th>
            <th>Jackpot</th>
            <th>Game Version | Commit</th>
        </tr>
    )
}
export default ChosenGameHeaders;