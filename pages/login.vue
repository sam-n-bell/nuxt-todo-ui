<template>
    <v-layout align-center justify-center wrap>
        <v-flex xs12 sm8 md6 lg4 xl 4 class="text-xs-center">
            <v-card dark class="elevation-10">
                <v-toolbar dark class="pt-2">
                    <span class="subheading">Login To See Tasks</span>
                </v-toolbar>
                <v-card-text>
                    <form>
                        <v-layout row>
                            <v-flex>
                                <v-text-field
                                v-validate="'required|max:50'"
                                v-model="username" 
                                data-vv-name="username"
                                type="text"
                                :error-messages="errors.collect('username')"
                                label="Username"
                                placeholder="email@domain.com"/>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <v-text-field
                                v-validate="'required|max:50'"
                                v-model="password" 
                                data-vv-name="passowrd"
                                :error-messages="errors.collect('password')"
                                label="Password"
                                placeholder="hopefully it's not password!"/>
                            </v-flex>
                        </v-layout>
                        <v-layout row v-if="login_error">
                            <v-flex>
                                <span class="error--text">Error logging in {{login_error}}</span>
                            </v-flex>
                        </v-layout>
                        <v-card-actions>
                            <!-- Block makes the button take full width -->
                            <v-btn 
                                color="primary"
                                block
                                @click="appLogin"
                                :disabled="errors.any()"
                                :loading="login_loading"
                            >
                                Let Me In
                            </v-btn>
                        </v-card-actions>
                    </form>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { Validator } from 'vee-validate';

export default {
    // layout changes this page to use a different layout than 'default.vue'
    layout: "loginlayout", 
    components:{

    },
    data: () => ({
        username: "",
        password: ""
    }),
    computed:{
        login_error () {
            return this.$store.state.authentication.login_error;
        },
        login_loading () {
            return this.$store.state.authentication.login_loading;
        },
         ...mapGetters ({
            "isUserAuthenticated": "authentication/isUserAuthenticated"
        })
    },
    watch: {
        isUserAuthenticated (new_value) {
            if (new_value) {
                console.log('is authenticated');
                this.$router.push('/');
            }
        }
    },
    methods: {
        appLogin() {
            this.$validator.validateAll().then(res => {
                if (res) {
                    this.login({
                        username: this.username,
                        password: this.password
                    })
                }
            })
        },
        ...mapActions({
            login: "authentication/login"
        })
    }
}
</script>