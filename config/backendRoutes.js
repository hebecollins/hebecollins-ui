export const BACKEND_ROUTES = {
    LOGIN: "/login",
    SIGNUP: "/register-manager",
    LOGOUT: "/logout",
    PASSWORD:{
        CHANGE:"password-change",
        RECOVER: "/password-recover",
        RESET: "/password-reset",
    },
    VERIFY: "/verify",
    ACTIVATE: {
        MANAGER: "/activate-manager",
        CLIENT:"activate-client",
        TRAINER:"activate-trainer"
    },
    ADD_TRAINERS: "/add-trainers"
};