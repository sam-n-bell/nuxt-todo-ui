import Cookie from 'js-cookie';
import jsonwebtoken from 'jsonwebtoken';

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
        //const token = Cookie.get()
        return !!state.user;
    }
};

const actions = {
    login( {commit, dispatch}, user) {
        commit("login");

        const config = { headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, timeout: 4000};

        try {
            console.log(qs.stringify(user))
            //await this.$axios.post(``, qs.stringify(user), config);
            commit("loginSuccess", user);
        } catch (err) {
            commit("loginFailure", err.message)
        }
    },
    logout( {commit, dispatch}, user) {
        try {
            //await this.$axios.post(``);
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
    logout (state) {
        state.user=null;
        state.login_error=null;
        state.login_loading=true;
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
