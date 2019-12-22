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
    }
};

const mutations = {
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
