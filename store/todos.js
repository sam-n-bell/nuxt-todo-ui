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
    }
});

const getters = {

};

const actions = {
    createToDo ({ commit, dispatch },  todo ) {
        dispatch('getToDos')
    },
    async getToDos ({commit, dispatch}) {
        commit("getToDos");
        try {
            //uncomment this block when Spring REST works
            // let todos = await this.$axios.get(``, { timeout: 5000 });
            // if (todos._embedded && todos._embedded.todoEntities) { //entities are a Spring Boot thing
            //     commit("getToDosSuccess", todos._embedded.todoEntities)
            // } else {
            //     commit("getToDosSuccess", [])
            // }

            //delete below because it's just test junk
            let todos = []
            for (let i = 1; i < 4; i++) {
                todos.push({
                    id: todos.length,
                    description: `test todo ${i}`,
                    date: new Date().toISOString().substr(0, 10),
                    priority: i % 2 === 0 ? 'medium' : 'low'
                })
            }
            //delete above code
            commit("getToDosSuccess", todos)
        } catch (err) {
            commit("getToDosFailure", err.message)
        }
    },
    async createToDo ({commit, dispatch}, todo) {
        commit("createToDo")
        try {
            // uncomment out below code when API works
            // let response = await this.$axios.post(``, {timeout: 4000})
            // commit("createToDoSuccess", response)
            // commit("createToDoSuccess", todo)
            // code above is for API
            commit("addDummyToDo", todo)
        } catch (err) {
            console.log(err.message);
            commit("createToDoFailure", err.message)
        }
    },
    async deleteToDo ({commit, dispatch}, id) {
        commit("deleteToDo")
        try {
            // const response = await this.$axios.delete(``);
            commit("deleteToDoSuccess", id)
        } catch (err) {
            commit("deleteToDoFailure", err.message)
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

        //remove this code when Spring Boot API works
        console.log(state.my_todos);
        state.my_todos = state.my_todos.filter(i => i.id !== id);
        console.log(state.my_todos);
    },
    deleteToDoFailure(state, error) {
        state.delete_todo.payload = null
        state.delete_todo.loading = false
        state.delete_todo.error = error
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
