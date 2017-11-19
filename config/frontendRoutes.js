export const ROUTES = [

    //home page while logged out
    {ROUTE_NAME: 'HOME', ROUTE: '/', PERMISSION: ['guest']},


    //authentication
    {ROUTE_NAME: 'VERIFY', ROUTE: '/verify', PERMISSION: ['guest']},
    {ROUTE_NAME: 'PASSWORD_RECOVER', ROUTE: '/password/recover', PERMISSION: ['guest']},
    {ROUTE_NAME: 'PASSWORD_RESET', ROUTE: '/password/reset', PERMISSION: ['guest']},
    {ROUTE_NAME: 'PASSWORD_CHANGE', ROUTE: '/password/change', PERMISSION: ['client', 'trainer', 'manager', 'admin']},


    //manager
    {ROUTE_NAME: 'MANAGER_HOME', ROUTE: '/manager', PERMISSION: ['manager']},
    {ROUTE_NAME: 'ACTIVATE_MANAGER', ROUTE: '/activate/manager', PERMISSION: ['guest']},
    {ROUTE_NAME: 'ADD_TRAINER', ROUTE: '/add/trainer', PERMISSION: ['manager']},
    {ROUTE_NAME: 'CLIENT_LIST_FOR_MANAGER', ROUTE: '/manager/clients', PERMISSION: ['manager']},

    //trainer
    {ROUTE_NAME: 'TRAINER_HOME', ROUTE: '/trainer', PERMISSION: ['trainer']},
    {ROUTE_NAME: 'ADD_CLIENT', ROUTE: '/add/client', PERMISSION: ['trainer']},
    {ROUTE_NAME: 'ACTIVATE_TRAINER', ROUTE: '/activate/trainer', PERMISSION: ['guest']},
    {ROUTE_NAME: 'CLIENT_LIST_FOR_TRAINER', ROUTE: '/trainer/clients', PERMISSION: ['trainer']},
    {ROUTE_NAME: 'ASSIGN_WORKOUT', ROUTE: '/assign/workout', PERMISSION: ['trainer']},
    {ROUTE_NAME: 'CREATE_WORKOUT', ROUTE: '/create/workout', PERMISSION: ['trainer']},
    {ROUTE_NAME: 'SAVED_WORKOUT_LIST', ROUTE: '/trainer/workout/list', PERMISSION: ['trainer']},
    {ROUTE_NAME: 'VIEW_SAVED_WORKOUT', ROUTE: '/trainer/workout/view', PERMISSION: ['trainer']},
    {ROUTE_NAME: 'EDIT_SAVED_WORKOUT', ROUTE: '/trainer/workout/edit', PERMISSION: ['trainer']},
    {ROUTE_NAME: 'EDIT_VIEWED_WORKOUT', ROUTE: '/workout/edit', PERMISSION: ['trainer']},


    //client
    {ROUTE_NAME: 'CLIENT_HOME', ROUTE: '/client', PERMISSION: ['client']},
    {ROUTE_NAME: 'ACTIVATE_CLIENT', ROUTE: '/activate/client', PERMISSION: ['guest']},
    {ROUTE_NAME: 'GET_WORKOUT_FOR_TODAY',ROUTE: '/client/workout', PERMISSION: ['client']},
    {ROUTE_NAME: 'RATE_TRAINER',ROUTE: '/client/trainer/review/rate', PERMISSION: ['client']},
    {ROUTE_NAME: 'VIEW_TRAINER_REVIEW',ROUTE: '/client/trainer/review/view', PERMISSION: ['client']},


    //commons
    {ROUTE_NAME: 'NO_RECORDS_FOUND', ROUTE: '/404', PERMISSION: ['manager', 'trainer', 'client','admin']},
    {ROUTE_NAME: 'CLIENT_PROFILE', ROUTE: '/client/profile', PERMISSION: ['manager', 'client', 'trainer']},//temporary
    {ROUTE_NAME: 'VIEW_WORKOUT_FOR_SELECTED_CLIENT', ROUTE: '/workout/view', PERMISSION: ['manager', 'trainer']},//temporary


    //admin
    {ROUTE_NAME: 'ADMIN_HOME', ROUTE: '/admin', PERMISSION: ['admin']},
    {ROUTE_NAME: 'ADD_QUOTES', ROUTE: '/add/quotes', PERMISSION: ['admin']},
    {ROUTE_NAME: 'ADD_GIF', ROUTE: '/add/gif', PERMISSION: ['admin']},
    {ROUTE_NAME: 'GIF_LIST', ROUTE: '/list/gif', PERMISSION: ['admin']},
    {ROUTE_NAME: 'CATEGORY_LIST', ROUTE: '/list/category', PERMISSION: ['admin']},

];