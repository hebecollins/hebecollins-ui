import query from 'array-query';
import {ROUTES} from "../../../config/frontendRoutes"

export function getRouteByName(name){
    return query('ROUTE_NAME').is(name).on(ROUTES)[0].ROUTE
}

/**@param route => route for which user permission information is required
 * @return array => array of userTypes for which given route is supposed to be allowed
 * */
export function getPermissionByRoute(route){
    console.log('route uis ger');
    console.log(route);
    const lastCharacterOfRoute = route[route.length -1];
    if(route.length !==1 &&lastCharacterOfRoute === '/'){
        /*** Need to convert route/ into route  ***/
        route = route.slice(0,-1)
    }
    return query('ROUTE').is(route).on(ROUTES)[0].PERMISSION
}
