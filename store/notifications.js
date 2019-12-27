const state = () => ({
    remove_todo_dialog: {
        title: "",
        visible: false,
        body: "",
        confirm_button_text: "",
        confirm_button_function: null,
        cancel_button_text: "",
        cancel_button_function: null
    },
    snackbar: {
        visible: false,
        timeout: 0,
        top: true,
        autoheight: true,
        text: "",
        close_button_text: "",
        color: "",
        close_button_function: null
    }
});

const getters = {

};

const actions = {
    showRemoveDialog( {commit, dispatch}, options) {
        commit("showRemoveDialog", options);
    },
    showSnackBar ( {commit, dispatch}, options) {
        commit("showSnackBar", options)
    }
};

const mutations = {
    showRemoveDialog (state, options) {
        state.remove_todo_dialog.title = options.title;
        state.remove_todo_dialog.visible = true;
        state.remove_todo_dialog.body = options.body;
        state.remove_todo_dialog.confirm_button_text = options.confirm_button_text;
        state.remove_todo_dialog.cancel_button_text = options.cancel_button_text;
        state.remove_todo_dialog.cancel_button_function = options.cancel_button_function;
        state.remove_todo_dialog.confirm_button_function = options.confirm_button_function;
    },
    hideRemoveDialog (state) {
        state.remove_todo_dialog.title = "";
        state.remove_todo_dialog.visible = false;
        state.remove_todo_dialog.body = "";
        state.remove_todo_dialog.confirm_button_text = "";
        state.remove_todo_dialog.cancel_button_text = "";
        state.remove_todo_dialog.cancel_button_function = null;
        state.remove_todo_dialog.confirm_button_function = null;
    },
    showSnackBar (state, options) {
        console.log('snackbar options')
        console.log(options)
        state.snackbar.visible = true;
        state.snackbar.text = options.text;
        state.snackbar.close_button_text = options.close_button_text;
        state.snackbar.color = options.color;
        state.snackbar.close_button_function = options.close_button_function;
    },
    hideSnackBar (state) {
        state.snackbar.visible = false;
        state.snackbar.text = "";
        state.snackbar.close_button_text = "";
        state.snackbar.color = "";
        state.snackbar.close_button_function = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
