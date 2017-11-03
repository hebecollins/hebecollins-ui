export const BACKEND_ROUTES = {
    LOGIN: "/login",
    SIGNUP: "/register/manager",
    LOGOUT: "/logout",
    PASSWORD:{
        CHANGE:"password/change",
        RECOVER: "/password/recover",
        RESET: "/password/reset",
    },
    VERIFY: "/verify",
    RESEND_OTP: "/resend/otp",
    ACTIVATE: {
        MANAGER: "/activate/manager",
        CLIENT:"/activate/client",
        TRAINER:"/activate/trainer"
    },
    ADD:{
        TRAINER: "/add/trainer",// :gymId/add/trainers
        CLIENT: "/add/client",// :gymId/add/client
    },

    LIST:{
       CLIENT:{
           TRAINER_LIST:""
       },
        TRAINER:{
           CLIENT_LIST:"/trainer/clients"//:gymId/trainer/clients
        },
        MANAGER:{
           CLIENT_LIST:"/manager/clients",//:gymId/trainer/clients
           TRAINER_LIST:""
        }
    },

    WORKOUT:{
      ASSIGN:"/workout/assign"//:gymId/workout/assign/:clientId
    },

    QUOTE:"/quote",
    REMARKS:"/remarks"//:gymId/remarks/:selectedUserId
};