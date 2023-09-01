import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import "./index.css";
import DateComp from "./Components/DateComp";
import TodayComp from "./Components/TodayComp";

export const DaysContext = createContext();
export const SetDayContext = createContext();
export const ClickCheckboxContext = createContext();
// const initialTodos = [
//   {
//     jobs: [
//       { status: false, text: "Upgrade YourSelf-1" },
//       { status: false, text: "Upgrade YourSelf-2" },
//       { status: false, text: "Upgrade YourSelf-3" },
//       { status: false, text: "Upgrade YourSelf-4" },
//       { status: false, text: "Upgrade YourSelf-5" },
//       { status: false, text: "Upgrade YourSelf-6" },
//       { status: false, text: "Upgrade YourSelf-7" },
//     ],
//     date: "Today",
//   },
//   {
//     jobs: [
//       { status: false, text: "Upgrade YourSelf-8" },
//       { status: false, text: "Upgrade YourSelf-9" },
//       { status: false, text: "Upgrade YourSelf-10" },
//       { status: false, text: "Upgrade YourSelf-11" },
//       { status: false, text: "Upgrade YourSelf-12" },
//       { status: false, text: "Upgrade YourSelf-13" },
//     ],
//     date: "31/01/17",
//   },
//   {
//     jobs: [
//       { status: false, text: "Upgrade YourSelf-14" },
//       { status: false, text: "Upgrade YourSelf-15" },
//       { status: false, text: "Upgrade YourSelf-16" },
//       { status: false, text: "Upgrade YourSelf-17" },
//       { status: false, text: "Upgrade YourSelf-18" },
//     ],
//     date: "14/02/17",
//   },
//   {
//     jobs: [
//       { status: false, text: "Upgrade YourSelf-19" },
//       { status: false, text: "Upgrade YourSelf-20" },
//       { status: false, text: "Upgrade YourSelf-21" },
//     ],
//     date: "18/02/17",
//   },
//   {
//     jobs: [
//       { status: false, text: "Upgrade YourSelf-22" },
//       { status: false, text: "Upgrade YourSelf-23" },
//       { status: false, text: "Upgrade YourSelf-24" },
//       { status: false, text: "Upgrade YourSelf-25" },
//       { status: false, text: "Upgrade YourSelf-26" },
//     ],
//     date: "23/02/17",
//   },
//   {
//     jobs: [{ status: false, text: "Upgrade YourSelf-27" }],
//     date: "31/02/17",
//   },
//   {
//     jobs: [
//       { status: false, text: "Upgrade YourSelf-28" },
//       { status: false, text: "Upgrade YourSelf-29" },
//     ],
//     date: "04/03/17",
//   },
// ];
const initialTodos =[];
function App() {
  const reducerMethod = (autoState, action) => {
    switch (action.type) {
      case "load":
        // console.log("test Action Data");
        return action.data;
      case "click":
        // console.log("Action Is Click");

        return autoState.map((day, i) => {
          if (i == action.day) {
            day.jobs[action.jobIndex].status =
              !day.jobs[action.jobIndex].status;
          }

          return day;
        });
      case "remove":
        return autoState.map((day, i) => {
          if (i == action.day) {
            day.jobs = day.jobs.filter((job, j) => {
              if (j == action.jobIndex) {
                return false;
              } else {
                return true;
              }
            });
            return day;
          } else {
            return day;
          }
        });
      case "add-job":
        return autoState.map((day, i) => {
          if (i == action.day) {
            const newJop = { status: false, text: action.jobText };
            console.log(action.jobText + " Jobtext");
            day.jobs.push(newJop);

            return day;
          } else {
            return day;
          }
        });
      case "add-day":
        const dayObj = { jobs: [], date: action.text };
        return [...autoState, dayObj];
      case "remove-day":
        return autoState.filter((day, i) => {
          if (action.dayIndex == i) {
            return false;
          }
          return true;
        });
      default:
        return autoState;
    }
  };
  const [days, reducerDispatch] = useReducer(reducerMethod, initialTodos);
  const [day, setDay] = useState(0);

  const SaveDays = (daysArray) => {
    const daysData = JSON.stringify(daysArray);
    window.localStorage.setItem("days", daysData);
  };
  const LoadDays = () => {
    let  daysData= window.localStorage.getItem("days");
    daysData=JSON.parse(daysData);
    const actionObj ={type:"load",data:daysData};
    reducerDispatch(actionObj);
  };

  useEffect(() => {
    LoadDays();
  }, []);
  useEffect(() => {
    SaveDays(days);
  }, [days]);
  return (
    <div className="App w-full min-h-screen flex justify-center items-center">
     <div className="min-w-[70%] min-h-screen bg-black flex ">
     <DaysContext.Provider value={days}>
        <SetDayContext.Provider value={setDay}>
          <DateComp reducerDispatch={reducerDispatch} />
        </SetDayContext.Provider>
      </DaysContext.Provider>

      <ClickCheckboxContext.Provider value={reducerDispatch}>
        {days.length > 0&&days[day]&&days!==null && <TodayComp DayInfo={days[day]} DayIndex={day} />}
      </ClickCheckboxContext.Provider>
     </div>
    </div>
  );
}

export default App;
