import { useState } from "react";
import useWorkoutsContext from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";







const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  let [emptyFields, setEmpty] = useState([]);
  const {user}=useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!user){
      setError('You must be logged in');
      return ;

    }

    const workout = { title, load, reps }; //data to be sent
    //we send the post request to send the data
    //convert the object to the JSON by JSON.stringify
    const response = await fetch("http://localhost:4000/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    });
    //then we check the response we get
    //if we get an error we set the error state
    //else we set all the states back to the initial value
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmpty(json.emptyFields);
    }
    if (response.ok) {
      setError(null);
      setEmpty([]);
      setTitle("");
      setLoad("");
      setReps("");
      dispatch({ type: "CREATE_WORKOUTS", payload: json });
      console.log("new workout added:", json);
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit} >
      <h3>Add a New Workout</h3>

      <label>Exercise Title:</label>
      <input
        name="title"
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ' '}
      />

      <label>Load (in kg):</label>
      <input
        name="load"
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : " "}
      />

      <label>Number of Reps:</label>
      <input
        name="reps"
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : " "}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
