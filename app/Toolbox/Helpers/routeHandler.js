import query from 'array-query';
import {ROUTES} from "../../../config/frontendRoutes"

export function getRouteByName(name){
    return query('ROUTE_NAME').is(name).on(ROUTES)[0].ROUTE
}

export function getPermissionByRoute(route){
    return query('ROUTE').is(route).on(ROUTES)[0].PERMISSION
}
