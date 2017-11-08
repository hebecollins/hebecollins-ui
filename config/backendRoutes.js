export const BACKEND_ROUTES = {

    //authentication routes
    AUTHENTICATION:{
        LOGIN: "/login",
        SIGNUP: "/register/manager",
        LOGOUT: "/logout",
        PASSWORD: {
            CHANGE: "password/change",
            RECOVER: "/password/recover",
            RESET: "/password/reset",
        },
        VERIFY: "/verify",
        RESEND_OTP: "/resend/otp",
    },


    //manager routes
    MANAGER:{
        ACTIVATE: "/activate/manager",
        ADD_TRAINER: "/add/trainer",// :gymId/add/trainers
        CLIENT_LIST: "/manager/clients",//:gymId/trainer/clients
        TRAINER_LIST: "",//:gymId/trainer/clients
    },


    //trainer routes
    TRAINER:{
        ACTIVATE: "/activate/trainer",
        ADD_CLIENT: "/add/client",// :gymId/add/client
        CLIENT_LIST: "/trainer/clients",//:gymId/trainer/clients

        WORKOUT:{
            ASSIGN: "/workout/assign",//:gymId/workout/assign/:clientId
            CREATE: "/workout/create",//:gymId/workout/create
            LIST: "/trainer/workout/list",//:gymId/trainer/workout/list
            GET_BY_LABEL: "/trainer/workout",//:gymId/trainer/workout/:labelId
            DELETE_BY_LABEL: "/trainer/workout/delete"//:gymId/trainer/workout/:labelId
        },
    },


    //client routes
    CLIENT:{
        ACTIVATE: "/activate/client",
        WORKOUT:{
            CURRENT:"/client/workout",// :gymId/"/client/workout
        }
    },


    //common routes used by more than one user type
    COMMONS:{
        REMARKS: "/remarks",//:gymId/remarks/:selectedUserId
        QUOTE: "/quote",
    },


    //admin routes
    ADMIN:{
        ADD_QUOTE: "/add/quote",
        EXERCISE_LIST: "/exercise/gif/pending",
        POST_EXERCISE_GIF: "/exercise/gif",
    },
};