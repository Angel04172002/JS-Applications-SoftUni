import * as authService from "../services/auth.js";
import { logoutUser } from "../services/api.js";
import { router } from "./router.js";

export function renderLogout() {

    logoutUser();
    authService.logout();
}
