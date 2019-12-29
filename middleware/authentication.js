import Cookie from 'js-cookie';
import constants from '../assets/constants.js';

export default function(context) {

    if (!context.store.getters["authentication/isUserAuthenticated"]) {

        // looks for cookie in browser
        let jwt = Cookie.get(constants.app_constants.auth_cookie_id);

        // cookie found
        if (jwt) {
            // set value from cookie to be used in authenticated http calls
            context.$axios.defaults.headers.common[constants.app_constants.auth_cookie_id] = jwt;
            context.store.commit("authentication/saveJWT", jwt);
        } else {
            // redirect to login
            return context.redirect("/login")
        }

    } else {
        // looks for cookie in browser
        let jwt = Cookie.get(constants.app_constants.auth_cookie_id);

        // cookie found
        if (jwt) {
            // set value from cookie to be used in authenticated http calls
            context.$axios.defaults.headers.common[constants.app_constants.auth_cookie_id] = jwt;
            context.store.commit("authentication/saveJWT", jwt);
        } else {
            // redirect to login
            return context.redirect("/login")
        }
    }

}