import React, { useEffect, useState } from "react";
import { IJackpot } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { getJackpotById, updateJackpotById } from "../../util_jackpot";

const UpdateJackpot = (): JSX.Element => {   
  const [name, setName] = useState("");
  const [isOk, setOkState] = useState(false);
  const [jackpotType, setJackpotType] = useState("");
  const [percentageSetList, setPercentageSetList] = useState(Number);

  const [jackpot, setJackpot] = useState<IJackpot[]>([])

  const navigate = useNavigate()

  let {jackpotId} = useParams()

  useEffect(() => {
    getJackpotById(jackpotId)
    .then(data => {
      setJackpot([data])     
      setName(data.jackpotName)
      setJackpotType(data.jackpotType)
      setPercentageSetList(data.percentageSetList) 
    })
    .catch(error => {
      console.log("Error fetching jackpot: ", error);
    })
  },[jackpotId])

  function checkCompatibility(e: React.ChangeEvent<HTMLInputElement>): void {
    const input = e.target.value;
    if (input) {
      setName(input);
      setOkState(true);
    } else {
      setName("");
      setOkState(false);
    }
  }

  function handleJackpotType(e: React.ChangeEvent<HTMLInputElement>): void {
    const jackpotType = e.target.value;
    setJackpotType(jackpotType);
  }

  // function handlePercentageSetList(e: React.ChangeEvent<HTMLInputElement>): void {
  //   const percentageSetList = e.target.value.split(' ').map(Number).filter(value => !isNaN(value));
  //   setPercentageSetList(percentageSetList);
  // }

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    // const NameAlreadyExists = jackpot.find((e)=>e.jackpotName === name);

    const isEmptyName = !name;
    const isEmptyJackpotType = jackpotType.length === 0;
    const isEmptyPercentageSetList = !percentageSetList;

    // if(NameAlreadyExists){
    //     alert("Jackpot Name already exists! Please type different Jackpot Name!");
    // } else 
    if(isEmptyName || isEmptyJackpotType || isEmptyPercentageSetList){
        alert("Field Is Empty! Please Fill all the required fields!")
        if(isEmptyName)
          alert("Jackpot Name")
        else if(isEmptyJackpotType)
          alert("Jackpot Type")
        else if(isEmptyPercentageSetList)
          alert("Percentage Set List")
    } else  {
        try {
          const newJackpot: IJackpot = {
            jackpotName: name,
            jackpotId: 0, 
            jackpotType: jackpotType,
            percentageSetList: percentageSetList,
          };

          await updateJackpotById(jackpotId, newJackpot);

          console.log("Jackpot added successfully");
          setJackpot([newJackpot]);
          setName("");
          setOkState(false);
          setJackpotType("");
          setPercentageSetList(0);
          navigate('/')
        } catch (error) {
          console.error("Error adding jackpot:", error);
        }
      }
    }

    async function goBack() {
      try{
        navigate('/')
    } catch(error) {
        console.log("Can not go back: ", error);
    }
    }

  return (
    <form onSubmit={handleSubmit} className="main">
      <h1>Update Jackpot [{jackpotId} Id]</h1>
      <label>Jackpot Name:</label>
      <br />
        <input className="label"
          type="text" 
          value={name}
          onChange={(e) => checkCompatibility(e)}
        />
      <br />
      <label>
        Jackpot Type:</label>
      <br />
        <input className="label"
          type="text"
          value={jackpotType}
          onChange={(e) => handleJackpotType(e)}
        />
      <br />
      <label>Percentage Set List:</label>
      <br />
        <input className="label"
          type="number"
          value={percentageSetList}
          onChange={(e) => setPercentageSetList(parseInt(e.target.value))}
        />
      <br />
      <br />
      <button type="submit" className="button">Submit</button>
      <button type="button" className="button" onClick={goBack}>Go Back</button>
    </form>
  );
};

export default UpdateJackpot;
