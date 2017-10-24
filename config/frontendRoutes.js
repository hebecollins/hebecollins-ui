export const ROUTES = [
    {
        ROUTE_NAME: 'GUEST_HOME',
        ROUTE:'/',
        PERMISSION:['guest']
    },
    {
        ROUTE_NAME: 'CLIENT_HOME',
        ROUTE:'/client',
        PERMISSION:['client']
    },
    {
        ROUTE_NAME: 'TRAINER_HOME',
        ROUTE:'/trainer',
        PERMISSION:['trainer']
    },
    {
        ROUTE_NAME: 'MANAGER_HOME',
        ROUTE:'/manager',
        PERMISSION:['manager']
    },
    {
        ROUTE_NAME: 'ADMIN_HOME',
        ROUTE:'/admin',
        PERMISSION:['admin']
    },
    {
        ROUTE_NAME: 'ACTIVATE_MANAGER',
        ROUTE:'/activate/manager',
        PERMISSION:['guest']
    },
    {
        ROUTE_NAME: 'VERIFY',
        ROUTE:'/verify',
        PERMISSION:['guest']
    },
    {
        ROUTE_NAME: 'PASSWORD_RECOVER',
        ROUTE:'/password/recover',
        PERMISSION:['guest']
    },
    {
        ROUTE_NAME: 'PASSWORD_RESET',
        ROUTE:'/password/reset',
        PERMISSION:['guest']
    },
    {
        ROUTE_NAME: 'PASSWORD_CHANGE',
        ROUTE:'/password/change',
        PERMISSION:['client','trainer','manager','admin']
    },
    {
        ROUTE_NAME: 'ADD_TRAINER',
        ROUTE:'/add/trainer',
        PERMISSION:['manager']
    },
    {
        ROUTE_NAME: 'ADD_CLIENT',
        ROUTE:'/add/client',
        PERMISSION:['trainer']
    },
    {
        ROUTE_NAME: 'ACTIVATE_TRAINER',
        ROUTE:'/activate/trainer',
        PERMISSION:['guest']
    },

    {
        ROUTE_NAME: 'ACTIVATE_CLIENT',
        ROUTE:'/activate/client',
        PERMISSION:['guest']
    },
    {
        ROUTE_NAME: 'ADD_WORKOUT',
        ROUTE:'/add/workout',
        PERMISSION:['guest']
    },
    {
        ROUTE_NAME: 'ADD_QUOTES',
        ROUTE:'/add/quotes',
        PERMISSION:['admin']
    }
];