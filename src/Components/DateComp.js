import React, { useContext, useState } from "react";
import { DaysContext } from "../App";
import { SetDayContext } from "../App";
import AddDayComp from "./AddJobOrDay";
import AddJobComp from "./AddJobOrDay";
const DateComp = (props) => {
  const days = useContext(DaysContext);
  const setDate = useContext(SetDayContext);
  const handleDay = (counter) => {
    setDate(counter);
  };
  let a = 0;
 const DayAddHandler=(text)=>{
  const actionObj={type:"add-day",text:text};

  props.reducerDispatch(actionObj);
 }
 const DayRemoveHandler=(dayIndex)=>{
  const actionObj={type:"remove-day",dayIndex:dayIndex};
  props.reducerDispatch(actionObj);
 }
  return (
    <div className="my-list w-2/5 border-2 border-black bg-black py-10 px-2" >
      <div className="text-white tracking-widest text-3xl my-8">
        MyList
      </div>
      <AddJobComp AddHandler={DayAddHandler} PlaceHolder={"Enter Date or Name ..."}/>
      <div className="my-list__col flex flex-col w-full items-center">
        {days.map((day,i) => {
        
          return (
          <div key={crypto.randomUUID()} className="group text-white bg-day-red my-1  w-full flex justify-between   h-20 items-center">
              <div
              key={crypto.randomUUID()}
              onClick={() => {
                handleDay(i);
              }}
              className="my-list__day h-full flex flex-col justify-evenly items-start w-full  my-2 "
            >
              <span>Jobs Count :  {day.jobs.length}</span>
              <span>Day Subject :   {day.date}</span>
             
            </div>
            <button onClick={()=>{
              DayRemoveHandler(i)
            }} className="bg-red-800  rounded-lg p-2  hidden group-hover:block" type="button">Remove</button>
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default DateComp;
