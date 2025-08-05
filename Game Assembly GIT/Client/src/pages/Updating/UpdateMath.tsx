import React, { useEffect, useState } from "react";
import { IMath } from "../../types/types";
import { addMath, getMath, getMathById, updateMathById } from "../../util_math";
import { useNavigate, useParams } from "react-router-dom";

const UpdateMath = (): JSX.Element => {   
  const [name, setName] = useState("");
  const [isOk, setOkState] = useState(false);
  const [percentage, setPercentage] = useState<number[]>([]);
  const [percentageSetList, setPercentageSetList] = useState<number[]>([]);

  const [math, setMath] = useState<IMath[]>([])

  const navigate = useNavigate()

  let {mathId} = useParams()

  useEffect(() => {
    getMathById(mathId)
    .then(data => {
      setMath([data])     
      setName(data.mathName)
      setPercentage(data.percentage)
      setPercentageSetList(data.percentageSetList) 
    })
    .catch(error => {
      console.log("Error fetching math: ", error);
    })
  },[mathId])

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
    
    if (isEmptyName || isEmptyPercentage || isEmptyPercentageSetList) {
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
            mathId: Number(mathId),
            percentage: percentage,
            percentageSetList: percentageSetList
          };

          await updateMathById(mathId, newMath);

          console.log("Math added successfully");
          setMath([newMath]);
          setName("");
          setOkState(false);
          setPercentage([]);
          setPercentageSetList([]);
          navigate('/')
        } catch (error) {
          console.error("Error adding math:", error);
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
      <h1>Update Math [{mathId} Id]</h1>
      <label>Math Name:</label>
      <br />
        <input className="label"
          type="text"
          value={name}
          onChange={(e) => checkCompatibility(e)}
        />
      <br />
      <label>Percentage <strong>(separate with space)</strong>:</label>
      <br />
        <input className="label"
        value={percentage.join(' ')}
        onChange={(e) => handlePercentage(e)} />
      <br />
      <label>Percentage Set List <strong>(separate with space)</strong>:</label>
      <br />
        <input className="label"
        value={percentageSetList.join(' ')}
        onChange={(e) => handlePercentageSetList(e)} />
      <br />
      <br />
      <button type="submit" className="button">Submit</button>
      <button type="button" className="button" onClick={goBack}>Go Back</button>
    </form>
  );
};

export default UpdateMath;
