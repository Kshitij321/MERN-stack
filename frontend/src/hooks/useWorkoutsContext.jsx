import { useContext } from "react";
import { WorkoutsContext } from "../context/WorkoutContext";


//if we are using useWorkoutContext outside of where
//this context is providing data then it should throw an error




const useWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  if (!context) {
    throw Error("useWorkoutContext must be used inside WorkoutContextProvider");
  }
  return context;
};

export default useWorkoutsContext;
