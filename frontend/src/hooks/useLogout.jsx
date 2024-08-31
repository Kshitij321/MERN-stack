import { useAuthContext } from "./useAuthContext";
import useWorkoutsContext from "./useWorkoutsContext";
const useLogout = () => {
    const{dispatch}=useAuthContext();
    const{dispatch:workoutsdispatch}=useWorkoutsContext();
    const logout=()=>{
        //remove user from localstorage
        localStorage.removeItem('user');

        //global state update
        dispatch({type:'LOGOUT'});
        workoutsdispatch({type:'SET WORKOUTS',payload:null});
    }
    return ( { logout}  );
}
 
export default useLogout;