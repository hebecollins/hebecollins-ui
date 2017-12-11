import {postJSON} from "../Toolbox/Helpers/requestHandler";
import {BACKEND_ROUTES} from "../../config/backendRoutes";
import {addFlashMessage} from "./actionStore";

export const addGymToServer = (data) => {
    const dataToBeSent = {
        gym_name: data.gym_name,
        street_address: data.street_address,
        locality: data.locality,
        district: data.district,
        pin: data.pin,
        state: data.state,
        country: data.country,
    };

    return dispatch =>{
      return postJSON(dataToBeSent, BACKEND_ROUTES.MANAGER.ADD_GYM).then(res=>{
          dispatch(addFlashMessage({
              type: 'success',
              text: res.data.msg
          }));
      })
    }
};