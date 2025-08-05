import React, { useState, useEffect } from "react";
import Select from 'react-select'
import { IApp, IGame, IJackpot } from "../../types/types";
import { addApp, getApp } from "../../util_app";
import { getGame } from "../../util_game";
import { getJackpot } from "../../util_jackpot";

const AddApp = () : JSX.Element => {   
  const [name, setName] = useState("");
  const [isOk, setOkState] = useState(false);
  const [selectedJackpotId, setSelectedJackpotId] = useState(Number);
  const [region, setRegion] = useState<string>("");
  const [interfaceName, setInterface] = useState("");
  const [selectedGameId, setSelectedGameId] = useState<number[]>([]);
  const [selectedGameVersion, setSelectedGameVersion] = useState<[string, string]>(["", ""]);

  const [app, setApp] = useState<IApp[]>([])
  const [game, setGame] = useState<IGame[]>([])
  const [jackpot, setJackpot] = useState<IJackpot[]>([])

  useEffect(() => {
    getApp()
    .then(data => {
      setApp(data)      
    })
    .catch(error => {
      console.log("Error fetching app: ", error);
    })

    getGame()
    .then(data => {
      setGame(data)      
    })
    .catch(error => {
      console.log("Error fetching game: ", error);
    })

    getJackpot()
    .then(data => {
      setJackpot(data)      
    })
    .catch(error => {
      console.log("Error fetching jackpot: ", error);
    })
  },[])

  function checkCompatibility(e: React.ChangeEvent<HTMLInputElement>): void {
    const input = e.target.value;
    if (input){
      setName(input);
      setOkState(true);
    } else{
      setName("");
      setOkState(false);
    }
  } 

  function handleRegionChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setRegion(e.target.value);
  }

  function handleInterfaceChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInterface(e.target.value);
  }

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const NameAlreadyExists = app.find((e)=>e.appName === name);

    const isEmptyName = !name;
    const isEmptyRegion = region.length === 0;
    const isEmptyInterface = !interfaceName;
    const isEmptyGameList = selectedGameId.length === 0;

    if(NameAlreadyExists){
        alert("App Name already exists! Please type different App Name!");
    } else if(isEmptyName || isEmptyRegion || isEmptyInterface || isEmptyGameList){
        alert("Field Is Empty! Please Fill all the required fields!")
        if(isEmptyName)
            alert("App Name")
        else if(isEmptyRegion)
            alert("Region")
        else if(isEmptyInterface)
            alert("Interface")
        else if(isEmptyGameList)
            alert("Game List")
    } else{
      try{
        const newApp: IApp = {
          appName: name,
          gameSetId: 0, 
          jackpotId: selectedJackpotId,
          jackpotVersion: ['1.0', '1'],
          region: region,
          interface: interfaceName,
          gameList: selectedGameId.map(gameId => ({
            gameId: gameId,
            gameVersion: selectedGameVersion 
          }))
        }
        await addApp(newApp);
        console.log("App added successfully");
        setApp([...app, newApp]);
        setName("");
        setOkState(false);
        setSelectedJackpotId(0);
        setRegion("");
        setInterface("");
        setSelectedGameId([]);
      } catch (error) {
        console.error("Error adding app:", error);
      }
    }
  }

  const gamesMultiSelect = game.map((gameOption) => (
    {value: gameOption.gameId.toString(), label: gameOption.gameName}
  ))

  const jackpotSelect = [
    {value: "0", label: "No Jackpot"}, 
    ...jackpot.map((jackpotOption) => (
      {value:jackpotOption.jackpotId.toString(), label: jackpotOption.jackpotName}))
  ]

  return (
    <form onSubmit={handleSubmit} className='main'>
      <h1>Add App</h1>
      <label>App Name:</label>
      <br />
        <input className="label"
          type="text" 
          value={name}
          onChange={(e) => checkCompatibility(e)}
        />
      <br />
      <label>App Id:</label>
      <br />
        <input className="label"
          type="number"
          value={app.length + 1}
          disabled
        />
      <br />
      <label>Jackpot Name:</label>
          <Select className="label"
            options={jackpotSelect} 
            onChange={(selectedOptions) => {
              if( selectedOptions) {
                setSelectedJackpotId(parseInt(selectedOptions?.value));
              } else {
                setSelectedJackpotId(0);
              }
            }}  
          />
      <br />
      <label>Region:</label>
      <br />
        <input className="label"
          type="text" 
          value={region}
          onChange={(e) => handleRegionChange(e)}
        />
      <br />
      <label>Interface:</label>
      <br />
        <input className="label"
          type="text" 
          value={interfaceName}
          onChange={(e) => handleInterfaceChange(e)}
        />
      <br />
      <label>Game List:</label>
        <Select className="label"
          options={gamesMultiSelect} 
          isMulti
          onChange={(selectedOptions) => {
            const selectedGameId = selectedOptions.map(option => parseInt(option.value));
            setSelectedGameId(selectedGameId);
          }}  
        />
      <br />
      <button type="submit" className="button">Submit</button>
      <br />
    </form>
  );
};

export default AddApp;