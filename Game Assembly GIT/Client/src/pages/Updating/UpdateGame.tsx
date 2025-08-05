import React, { useEffect, useState } from "react";
import Select from 'react-select'
import { IGame, IMath } from "../../types/types";
import { getGameById, updateGameById } from "../../util_game";
import { getMath } from "../../util_math";
import { useNavigate, useParams } from "react-router-dom";

const UpdateGame = () : JSX.Element => {   
  const [name, setName] = useState("");
  const [isOk, setOkState] = useState(false);
  const [systemId, setSystemId] = useState(0);
  const [maxWLCMain, setMaxWLCMain] = useState(0);
  const [maxWLCFreegames, setMaxWLCFreegames] = useState(0);
  const [freegames, setFreegames] = useState(false);
  const [gamble, setGamble] = useState(false);
  const [jackpot, setJackpot] = useState(false);
  const [selectedMathId, setSelectedMathId] = useState(Number);

  const [game, setGame] = useState<IGame[]>([])
  const [math, setMath] = useState<IMath[]>([]); 

  const navigate = useNavigate()

  let {gameId} = useParams()

  useEffect(() => {
    getGameById(gameId)
    .then(data => {
      setGame([data])
      setName(data.gameName)
      setSystemId(data.systemId)
      setMaxWLCMain(data.maxWLCMain)
      setMaxWLCFreegames(data.maxWLCFreegames)
      setFreegames(data.freegames)
      setGamble(data.gamble)
      setJackpot(data.jackpot)
      setSelectedMathId(data.mathId)
    })
    .catch(error => {
      console.log("Error fetching game: ", error);
    })

    getMath()
    .then(data => {
      setMath(data)      
    })
    .catch(error => {
      console.log("Error fetching math: ", error);
    })
  },[gameId])

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
  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();

    const isEmptyName = !name;
    const isEmptySystemId = !systemId;
    const isEmptyMaxWLCMain = maxWLCMain <= 0;
    const isEmptyMaxWLCFreegames = maxWLCFreegames <= 0;
    const isEmptySelectedMathId = !selectedMathId

    if(isEmptyName || isEmptySystemId || isEmptyMaxWLCMain || isEmptyMaxWLCFreegames || isEmptySelectedMathId){
        alert("Field Is Empty! Please Fill all the required fields!")
        if(isEmptyName)
          alert("Game Name")
        else if(isEmptySystemId)
          alert("System Id")
        else if(isEmptyMaxWLCMain)
          alert("Max WLC Main")
        else if(isEmptyMaxWLCFreegames)
          alert("Max WLC Freegames")
        else if(isEmptySelectedMathId)
          alert("Math Id")
    } else{
      try{
        const updatedGame: IGame = {
          gameName: name,
          gameId: 0,
          systemId: systemId,
          maxWLCMain: maxWLCMain,
          maxWLCFreegames: maxWLCFreegames,
          freegames: freegames,
          gamble: gamble,
          jackpot: jackpot,
          mathId: selectedMathId,
          gameVersion: ['1.0', '1']
        }

        await updateGameById(gameId, updatedGame); 

        console.log("Game updated successfully");
        setGame([updatedGame]);
        setName("");
        setOkState(false);
        setSystemId(0);
        setMaxWLCMain(0);
        setMaxWLCFreegames(0);
        setFreegames(false);
        setGamble(false);
        setJackpot(false);
        setSelectedMathId(0);
        navigate('/')
      } catch (error) {
        console.error("Error updating game:", error);
      }
    }
  }

  const mathSelect = math.map((mathOption) => (
    {value:mathOption.mathId.toString(), label: mathOption.mathName}
  ))

  async function goBack() {
    try{
      navigate('/')
  } catch(error) {
      console.log("Can not go back: ", error);
  }
  }

  return (
    <form onSubmit={handleSubmit} className='main'>
      <h1>Update Game [{gameId} Id]</h1>
      <label>Game Name:</label>
      <br />
        <input className="label"
          type="text" 
          value={name}
          onChange={(e) => checkCompatibility(e)}
        />
      <br />
      <label>Max WLC Main:</label>
      <br />
        <input className="label"
          type="number"
          value={maxWLCMain}
          onChange={(e) => setMaxWLCMain(parseInt(e.target.value))}
        />
      <br />
      <label>Max WLC FreeGames:</label>
      <br />
        <input className="label"
          type="number"
          value={maxWLCFreegames}
          onChange={(e) => setMaxWLCFreegames(parseInt(e.target.value))}
        />
      <br />
      <label>Freegames:</label>
      <br />
        <input className="label"
          type="checkbox"
          checked={freegames}
          onChange={() => setFreegames(!freegames)}
        />
      <br />
      <label>Gamble:</label>
      <br />
        <input className="label"
          type="checkbox"
          checked={gamble}
          onChange={() => setGamble(!gamble)}
        />
      <br />
      <label>Jackpot:</label>
      <br />
        <input className="label"
          type="checkbox"
          checked={jackpot}
          onChange={() => setJackpot(!jackpot)}
        />
      <br />
      <label>Math Id:
      <Select className="label"
        options={mathSelect}
        value={mathSelect.find(mathOption => mathOption.value === selectedMathId?.toString())}
        onChange={(selectedOptions) => {
          if( selectedOptions) {
            setSelectedMathId(parseInt(selectedOptions.value));
          } else {
            setSelectedMathId(0);
          }
        }}
      />
      </label>
      <br />
      <label>Game Version:</label>
      <br />
        <input className="label"
          type="string"
          value={['1.0', '1'].join(' | ')}
          disabled
        />
      <br />
      <br />
      <button type="submit" className="button">Submit</button>
      <button type="button" className="button" onClick={goBack}>Go Back</button>
      <br />
    </form>
  );
};

export default UpdateGame;