export const BACKEND_ROUTES = {
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
    ACTIVATE: {
        MANAGER: "/activate/manager",
        CLIENT: "/activate/client",
        TRAINER: "/activate/trainer"
    },
    ADD: {
        TRAINER: "/add/trainer",// :gymId/add/trainers
        CLIENT: "/add/client",// :gymId/add/client
    },

    LIST: {
        CLIENT: {
            TRAINER_LIST: ""
        },
        TRAINER: {
            CLIENT_LIST: "/trainer/clients",//:gymId/trainer/clients
        },
        MANAGER: {
            CLIENT_LIST: "/manager/clients",//:gymId/trainer/clients
            TRAINER_LIST: ""
        }
    },

    WORKOUT: {
        ASSIGN: "/workout/assign",//:gymId/workout/assign/:clientId
        CREATE: "/workout/create",//:gymId/workout/create
        WORKOUT_LIST: "/trainer/workout/list",//:gymId/trainer/workout/list
        GET_WORKOUT_BY_LABEL: "/trainer/workout"//:gymId/trainer/workout/:labelId
    },

    QUOTE: "/quote",
    EXERCISE_LIST: "/exercise/gif/pending",// meant for admin
    POST_EXERCISE_GIF: "/exercise/gif",// meant for admin
    REMARKS: "/remarks"//:gymId/remarks/:selectedUserId
};