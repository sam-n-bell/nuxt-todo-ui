const state = () => ({
    remove_todo_dialog: {
        title: "",
        visible: false,
        body: "",
        confirm_button_text: "",
        confirm_button_func: null,
        cancel_button_text: "",
        cancel_button_func: null
    }
});

const getters = {

};

const actions = {
    showRemoveDialog( {commit, dispatch}, options) {
        commit("showRemoveDialog", options);
    }
};

const mutations = {
    showRemoveDialog (state, options) {
        console.log('here');
        console.log(options);
        state.remove_todo_dialog.title = options.title;
        state.remove_todo_dialog.visible = true;
        state.remove_todo_dialog.body = options.body;
        state.remove_todo_dialog.confirm_button_text = options.confirm_button_text;
        state.remove_todo_dialog.cancel_button_text = options.cancel_button_text;
        state.remove_todo_dialog.cancel_button_function = options.cancel_button_func;
        state.remove_todo_dialog.confirm_button_function = options.confirm_button_func;
    },
    hideRemoveDialog (state) {
        state.remove_todo_dialog.title = "";
        state.remove_todo_dialog.visible = false;
        state.remove_todo_dialog.body = "";
        state.remove_todo_dialog.confirm_button_text = "";
        state.remove_todo_dialog.cancel_button_text = "";
        state.remove_todo_dialog.cancel_button_function = null;
        state.remove_todo_dialog.confirm_button_function = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
