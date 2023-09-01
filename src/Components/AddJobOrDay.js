import React, { useRef, useState } from "react";

const AddJobComp = (props) => {
  const inputRef = useRef();
  const [text, setText] = useState("");
  const InputChangeHandler = (event) => {
    const test = event.currentTarget.value;
    setText(test);
  };
  return (
    <div className="w-full flex justify-between">
      <input
        placeholder={props.PlaceHolder ? props.PlaceHolder : "Enter"}
        ref={inputRef}
        className="text-white outline-none w-full mr-2 border-black bg-gray-800"
        type="text"
        name="new-job"
       
        
        value={text}
        onChange={(event) => {
          InputChangeHandler(event);
        }}
      />
      <button
        onClick={() => {
          props.AddHandler(inputRef.current.value);
          setText("");
        }}
        className={` ${text.replaceAll(/\s/g,'').length>0?"visible":"invisible"}  cursor-pointer bg-green-500 p-1 rounded-lg min-w-[80px] inline-block mr-2`}
        type="button"
      >
        Add
      </button>
    </div>
  );
};

export default AddJobComp;
