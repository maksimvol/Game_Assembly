import React, { useEffect, useState } from "react";
import { IJackpot } from "../../types/types";
import { addJackpot, getJackpot } from "../../util_jackpot";

const AddJackpot = () : JSX.Element => {   
  const [name, setName] = useState("");
  const [isOk, setOkState] = useState(false);
  const [jackpotType, setJackpotType] = useState("");
  const [percentageSetList, setPercentageSetList] = useState(Number);
  const [jackpot, setJackpot] = useState<IJackpot[]>([])

  useEffect(() => {
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

  function handleJackpotType(e: React.ChangeEvent<HTMLInputElement>): void {
    const jackpotType = e.target.value
    setJackpotType(jackpotType);
  }
  // function handlePercentageSetList(e: React.ChangeEvent<HTMLInputElement>): void {
  //   const percentageSetList = e.target.value.split(' ').map(Number);
  //   setPercentageSetList(percentageSetList);
  // }

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const NameAlreadyExists = jackpot.find((e)=>e.jackpotName === name);

    const isEmptyName = !name;
    const isEmptyJackpotType = jackpotType.length === 0;
    const isEmptyPercentageSetList = !percentageSetList;

    if(NameAlreadyExists){
        alert("Jackpot Name already exists! Please type different Jackpot Name!");
    } else if(isEmptyName || isEmptyJackpotType || isEmptyPercentageSetList){
        alert("Field Is Empty! Please Fill all the required fields!")
        if(isEmptyName)
          alert("Jackpot Name")
        else if(isEmptyJackpotType)
          alert("Jackpot Type")
        else if(isEmptyPercentageSetList)
          alert("Percentage Set List")
    } else{
      try{
        const newJackpot: IJackpot = {
          jackpotName: name,
          jackpotId: jackpot.length + 1, 
          jackpotType: jackpotType,
          percentageSetList: percentageSetList,
        }
        await addJackpot(newJackpot)
        console.log("Jackpot added successfully");
        setJackpot([...jackpot, newJackpot]);
        setName("");
        setOkState(false);
        setJackpotType("");
        setPercentageSetList(0);
      } catch (error) {
        console.error("Error adding jackpot:", error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className='main'>
      <h1>Add Jackpot</h1>
      <label>Jackpot Name:</label>
      <br />
        <input className="label"
          type="text" 
          value={name}
          onChange={(e) => checkCompatibility(e)}
        />
      <br />
      <label>
        Jackpot Id:</label>
      <br />
        <input className="label"
          type="number"
          value={jackpot.length + 1}
          disabled
        />
      <br />
      <label>
        Jackpot Type:</label>
      <br />
        <input className="label"
          type="text"
          onChange={(e) => handleJackpotType(e)}
        />
      <br />
      <label>Percentage Set List:</label>
      <br />
        <input className="label"
          type="number"
          onChange={(e) => setPercentageSetList(parseInt(e.target.value))}
        />
      <br />
      <br />
      <button type="submit" className="button">Submit</button>
      <br />
    </form>
  );
};

export default AddJackpot;