import Cookie from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';
import constants from '../assets/constants.js';

const qs = require('qs');

const state = () => ({
    login_loading: false,
    login_error: null,
    logout_dialog_visible: false,
    jwt: null,
    user: ""
});

const getters = {
    isUserAuthenticated (state) {
        const token = Cookie.get(constants.app_constants.auth_cookie_id)
        return !!state.user || !!token;
    }
};

const actions = {
    async login( {commit, dispatch}, user) {
        commit("login");

        const config = { headers: {
            'Content-Type': 'application/json'
        }, timeout: 4000};

        try {
            //console.log(qs.stringify(user))
            await this.$axios.post(constants.url_constants.login_url, user, config);
            commit("loginSuccess", user);
        } catch (err) {
            console.log(err)
            commit("loginFailure", err.message)
        }
    },
    logout( {commit, dispatch}, user) {
        try {
            commit("logout")
        } catch (err) {
            console.log(`Error when logging out: ${err.message}`)
        } finally {
            commit("logout");
        }
    }
};

const mutations = {
    login (state) {
        state.user=null;
        state.login_error=null;
        state.login_loading=true;
        state.logout_dialog_visible=false;
        state.jwt=null;
    },
    loginSuccess (state, user) {
        console.log('successful login for ' + user.username)
        state.login_loading=false;
        state.logout_dialog_visible=false;
        state.login_error=null;
        state.user=user.username;
    },
    loginFailure (state, error) {
        state.login_loading=false;
        state.logout_dialog_visible=false;
        state.login_error=error;
        state.user=null;
        state.jwt=null;
    },
    saveJWT (state, jwt) {
        state.jwt = jwt;
        // uncomment when api works
        //let decoded = jsonwebtoken.decode(jwt);
        //state.user = decoded.details.username;
    },
    logout (state) {
        Cookie.remove(constants.app_constants.auth_cookie_id);
        state.user=null;
        state.login_error=null;
        state.login_loading=false;
        state.logout_dialog_visible=false;
        state.jwt=null;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
