import React, { useContext } from "react";
import { ClickCheckboxContext } from "../App";
import AddJob from './AddJobOrDay';
const TodayComp = (props) => {
  const reducerDispatchObj = useContext(ClickCheckboxContext);
  const todoClickHandler = (jobIndex) => {
    console.log(jobIndex);
    const actionOBj={day:props.DayIndex, type: "click",jobIndex:jobIndex};
    reducerDispatchObj(actionOBj);
    console.log("CLICKED !")
  };
const todoRemoveHandler=(jobIndex)=>{
  const actionOBj={type:"remove",day:props.DayIndex,jobIndex:jobIndex};
  console.log(actionOBj);
  reducerDispatchObj(actionOBj);
  console.log("Remove Click...");
}
const todoAddHandler=(jobText)=>{
  console.log(jobText);
  const actionObj={day:props.DayIndex,type:"add-job",jobText:jobText};
  reducerDispatchObj(actionObj);
}
  console.log("Renderd  THis")
  return (
    <div className="w-3/5 bg-[#111]   py-10 px-4">
      <span className=" mb-2 block text-white">{props.DayInfo&& props.DayInfo.date}</span>
      <hr />
      <AddJob PlaceHolder={"Enter The Job"} AddHandler={todoAddHandler} />
      <div className="text-white">
        {props.DayInfo.jobs.map((job,i) => {
       
          console.log(job.status);
          return (
            <div className="group w-full flex justify-between" key={crypto.randomUUID()}>
              <span className="w-[80%]"
                onClick={(event) => {
             
                  event.preventDefault();
                  todoClickHandler(i);
                }}
              >
                <input
                  className="peer my-4"
                  id={`job__${i}`}
                  type="checkbox"
                  name="job"
                  checked={job.status}
                  onChange={()=>{}}
                />
                <label
                  className=" peer-checked:text-green-500 text-xl text-white "
                  htmlFor={`job__${i}`}
                >
                  {job.text}
                </label>
              </span>
              <button onClick={()=>{
                console.log(i);
                 todoRemoveHandler(i);
                
              }}   className="group-hover:visible invisible rounded-lg bg-red-400 p-1 ml-4" type="button">Remove</button>
             
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodayComp;
