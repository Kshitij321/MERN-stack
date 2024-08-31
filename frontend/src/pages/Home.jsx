import { useEffect } from "react";
import Workoutdetails from "../components/workoutdetails";
import WorkoutForm from "../components/WorkoutForm";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";




const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const {user}=useAuthContext();
  useEffect(() => {
    const fetchworkouts = async () => {
      const res = await fetch("http://localhost:4000/api/workouts",{
        headers:{'Authorization':`Bearer ${user.token}`},
      });
      const json = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    }
    if(user)fetchworkouts();
    
  },[dispatch,user]);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <Workoutdetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
