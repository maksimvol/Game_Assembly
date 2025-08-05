import React, { useEffect, useState } from "react";
import { IMath } from "../../types/types";
import { addMath, getMath } from "../../util_math";

const AddMath = (): JSX.Element => {   
  const [name, setName] = useState("");
  const [isOk, setOkState] = useState(false);
  const [percentage, setPercentage] = useState<number[]>([]);
  const [percentageSetList, setPercentageSetList] = useState<number[]>([]);

  const [math, setMath] = useState<IMath[]>([])

  useEffect(() => {
    getMath()
    .then(data => {
      setMath(data)      
    })
    .catch(error => {
      console.log("Error fetching math: ", error);
    })
  },[])

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

  function handlePercentage(e: React.ChangeEvent<HTMLInputElement>): void {
    const percentage = e.target.value.split(' ').map(Number).filter(value => !isNaN(value));
    setPercentage(percentage);
  }

  function handlePercentageSetList(e: React.ChangeEvent<HTMLInputElement>): void {
    const percentageSetList = e.target.value.split(' ').map(Number).filter(value => !isNaN(value));
    setPercentageSetList(percentageSetList);
  }

  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();

    const isEmptyName = !name;
    const isEmptyPercentage = percentage.length === 0;
    const isEmptyPercentageSetList = percentageSetList.length === 0
    const NameAlreadyExists = math.find((e) => e.mathName === name);

    if (NameAlreadyExists) {
      alert("Math Name already exists! Please type a different Math Name!");
    } else if (isEmptyName || isEmptyPercentage || isEmptyPercentageSetList) {
      alert("Field is empty! Please fill all the required fields!");
      if(isEmptyName){
        alert("Math Name")
      } else if(isEmptyPercentage){
          alert("Percentage ")
      } else if(isEmptyPercentageSetList){
          alert("Percentage Set List")
      }
      } else{
        try {
          const newMath: IMath = {
            mathName: name,
            mathId: 0,
            percentage: percentage,
            percentageSetList: percentageSetList
          };
          await addMath(newMath);
          console.log("Math added successfully");
          setMath([...math, newMath]);
          setName("");
          setOkState(false);
          setPercentage([]);
          setPercentageSetList([]);
        } catch (error) {
          console.error("Error adding math:", error);
        }
      }
    }
  return (
    <form onSubmit={handleSubmit} className="main">
      <h1>Add Math</h1>
      <label>Math Name:</label>
      <br />
        <input className="label"
          type="text"
          value={name}
          onChange={(e) => checkCompatibility(e)}
        />
      <br />
      <label>Math Id: </label>
      <br />
        <input className="label"
          type="number"
          value={math.length + 1}
          disabled
        />
      <br />
      <label>Percentage <strong>(separate with space)</strong>:</label>
      <br />
        <input className="label"
        type="number"
        value={percentage.join(' ')}
        onChange={(e) => handlePercentage(e)} />
      <br />
      <label>Percentage Set List <strong>(separate with space)</strong>:</label>
      <br />
        <input className="label"
        type="number"
        value={percentageSetList.join(' ')}
        onChange={(e) => handlePercentageSetList(e)} />
      <br />
      <br />
      <button type="submit" className="button">Submit</button>
    </form>
  );
};

export default AddMath;
