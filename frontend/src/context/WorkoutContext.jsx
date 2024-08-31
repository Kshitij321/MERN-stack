import { createContext, useReducer } from "react";
export const WorkoutsContext = createContext();
//We creatd a global context for the worrkouts

//since before we needed to render the workouts everytime a new worokout added
//we could do that by adding workouts in the dependency list of the useEffect
//but that would re-render entire page only for one workout

//so instead we create a useReducer and generate final state and the
//dispatch function for the workout state that would be passed down to
//each component to use, so they can use the final state and then
//the dispatch function to change the state whenever components chnge the state
//we pass these final state and dispatch using the context provider
//and using them in the components usng useContext hook

export const WorkoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return {
        workouts: action.payload,
      };
    case "CREATE_WORKOUTS":
      return {
        workouts: [action.payload, ...state.workouts],
      };
    case "DELETE_WORKOUT":
      return {
        workouts: state.workouts.filter(
          (w) => action.payload._id !== w._id
        ),
      };
    default:
      return state;
  }
};
////////////////////////////////// (complete workoutcontextprovider)
const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutsReducer, { workouts: null });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
////////////////////////////////////////

export default WorkoutsContextProvider;
