import constants from '../assets/constants.js';

const state = () => ({
    priorities: [
        { text: "High", value: "high" },
        { text: "Medium", value: "medium" },
        { text: "Low", value: "low" }
    ],
    my_todos: {
        payload: [],
        loading: false,
        error: null
    },
    create_todo: {
        payload: null,
        loading: false,
        error: null
    },
    delete_todo: {
        payload: null,
        loading: false,
        error: null
    },
    update_todo: {
        payload: null,
        loading: false,
        error: null
    }
});

const getters = {

};

const actions = {
    async getToDos ({commit, dispatch}) {
        commit("getToDos");
        try {
            let todos = await this.$axios.get(constants.url_constants.get_my_tasks, { timeout: 5000 });
            commit("getToDosSuccess", todos.data)
        } catch (err) {
            commit("getToDosFailure", err.message)
        }
    },
    async createToDo ({commit, dispatch}, todo) {
        commit("createToDo")
        try {
            let response = await this.$axios.post(constants.url_constants.create_todo, todo, {timeout: 4000})
            commit("createToDoSuccess", response.data)
        } catch (err) {
            console.log(err.message);
            commit("createToDoFailure", err.message)
        }
    },
    async deleteToDo ({commit, dispatch}, id) {
        commit("deleteToDo")
        try {
            await this.$axios.delete(`${constants.url_constants.delete_todo}${id}`, { timeout: 5000 });
            commit("deleteToDoSuccess", id);
        } catch (err) {
            console.log(err)
            commit("deleteToDoFailure", err.message)
        }
    },
    async updateToDo ({commit, dispatch}, todo) {
        commit("updateToDo");
        try {
            const response = await this.$axios.put(`${constants.url_constants.update_todo}/${todo.id}`, todo, {timeout: 5000});
            commit("updateToDoSuccess", response)
        } catch (err) {
            commit("updateToDoFailure", err.message);
            console.log(err);

        }
    }
};

const mutations = {
    deleteToDo(state) {
        state.delete_todo.payload = null;
        state.delete_todo.loading = true;
        state.delete_todo.error = null;
    },
    deleteToDoSuccess(state, id) {
        state.delete_todo.payload = id;
        state.delete_todo.loading = false;
        state.delete_todo.error = null;
    },
    deleteToDoFailure(state, error) {
        state.delete_todo.payload = null
        state.delete_todo.loading = false
        state.delete_todo.error = error
    },
    updateToDo(state) {
        state.update_todo.payload = null;
        state.update_todo.loading = true;
        state.update_todo.error = null;
    },
    updateToDoSuccess(state, response) {
        state.update_todo.payload = response;
        state.update_todo.loading = false;
        state.update_todo.error = null;
    },
    updateToDoFailure(state, error) {
        state.update_todo.payload = null
        state.update_todo.loading = false
        state.update_todo.error = error
    },
    createToDoSuccess(state, response) {
        state.create_todo.payload = response
        state.create_todo.loading = false
        state.create_todo.error = null
    },
    createToDoFailure(state, error) {
        state.create_todo.payload = null
        state.create_todo.loading = false
        state.create_todo.error = error
    },
    addDummyToDo(state, todo) {
        state.my_todos.payload.push(todo)
    },
    createToDo(state) {
        state.create_todo.payload = null
        state.create_todo.loading = false
        state.create_todo.error = null
    },
    createToDoSuccess(state, response) {
        state.create_todo.payload = response
        state.create_todo.loading = false
        state.create_todo.error = null
    },
    createToDoFailure(state, error) {
        state.create_todo.payload = null
        state.create_todo.loading = false
        state.create_todo.error = error
    },
    getToDos(state) {
        state.my_todos.payload = []
        state.my_todos.loading = true
        state.my_todos.error = null
    },
    getToDosSuccess(state, todos) {
        console.log(todos)
        state.my_todos.payload = todos
        state.my_todos.loading = false
        state.my_todos.error = null
    },
    getToDosFailure(state, error) {
        state.my_todos.payload = []
        state.my_todos.loading = false
        state.my_todos.error = error
    }
   
};

export default {
    state,
    getters,
    actions,
    mutations
};
