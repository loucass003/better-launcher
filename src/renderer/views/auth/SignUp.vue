<template>
    <v-flex xs12 sm5>
        <v-card ref="form">
            <v-card-text>
                <h1 class="text-xs-center">Sign Up</h1>
                <div v-if="users.length > 0">
                    <v-select
                        v-model="user"
                        :items="users"
                        append-outer-icon="send"
                        @click:append-outer="changeUser"
                        return-object
                        item-text="name"
                        label="Users"
                    ></v-select>
                    <v-divider></v-divider>
                </div>
                <v-text-field
                    label="Login"
                    v-model="login"
                ></v-text-field>
                
                <v-text-field
                    label="Password"
                    v-model="pass"
                ></v-text-field>
            </v-card-text>
            <v-divider class="mt-5"></v-divider>
            <v-card-actions>
                <v-layout justify-end>
                    <v-btn class="primary" @click.stop="signUp">
                        Sign Up
                    </v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-flex>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'SignUp',
    data() {
        return {
            user: this.$store.getters['session/selected'],
            login: null,
            pass: null,
        }
    },
    computed: {
        ...mapGetters({
            users: 'session/users',
        }),
        selected() {
            return this.user = this.$store.getters['session/selected'];
        }
    },
    methods: {
        ...mapActions({
            authenticate: 'session/authenticate',
            selectUser: 'session/selectUser'
        }),
        signUp() {
            console.log(this.login, this.pass)
            this.authenticate({ username: this.login, password: this.pass })
            .then((session) => {
                this.$router.push({ name: 'home' })
                console.log(session)
            })
            .catch(err => console.error(err))
        },
        changeUser() {
            if (this.selectUser(this.user.userId))
                this.$router.push({ name: 'home' })
        }
    }
}
</script>

<style lang="stylus">

</style>
