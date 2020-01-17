let base_url = "/todo-api/"
let url_constants = Object.freeze({
    login_url: `${base_url}login`,
    get_my_tasks: `${base_url}tasks/`,
    create_todo: `${base_url}tasks/`,
    delete_todo: `${base_url}tasks/`,
    update_todo: `${base_url}tasks/`
})

let app_constants = Object.freeze({
    auth_cookie_id: "X-TODO-TOKEN"
})


export default Object.freeze({
    url_constants: url_constants,
    app_constants: app_constants,
})