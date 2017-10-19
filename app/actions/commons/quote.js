import {BACKEND_ROUTES} from "../../../config/backendRoutes"
import {get} from "../../Toolbox/Helpers/requestHandler"

export function getQuote(){
    return dispatch=>{
        return get(BACKEND_ROUTES.QUOTE)
    }
}