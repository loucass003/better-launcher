<template>
    <div>
        <v-navigation-drawer permanent mini-variant app>
            <v-list>
            <v-list-tile 
                :to="route.path"
                :key="i"
                v-for="(route, i) in routes.filter(({ hide }) => !hide)"
            >
                <v-list-tile-action>
                    <v-icon v-html="route.icon"></v-icon>
                </v-list-tile-action>
            </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar app>
            <span class="headline" v-html="displayname"></span>
            <v-spacer></v-spacer>
            <v-menu :nudge-width="50">
                <v-toolbar-title slot="activator">
                    <skin style="width: 30px; height: 30px; float: left; margin-right: 10px;" :uuid="selected.uuid"></skin>
                    <span>{{ selected.name }}</span>
                    <v-icon dark>arrow_drop_down</v-icon>
                </v-toolbar-title>

                <v-list dark>
                    <v-list-tile>
                        <v-list-tile-title @click="switchAccount">switch account</v-list-tile-title>
                    </v-list-tile>
                    <v-list-tile>
                        <v-list-tile-title @click="logout">Logout</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>
        </v-toolbar>
        
        <v-content>
            <v-container fluid fill-height>
                <v-slide-y-transition mode="out-in">
                    <router-view></router-view>
                </v-slide-y-transition>
            </v-container>
        </v-content>
    </div>
</template>

<script>
import skin from "../../components/Skin";
import { routes } from "../../router";
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'layout',
    data: () => ({
      drawer: false,
      routes,
    }),
    components: {
        skin
    },
    computed: {
        ...mapGetters({
            selected: 'session/selected'
        }),
        displayname() {
            const route = routes.filter(({ name }) => name == this.$route.name)[0]
            return route && route.displayname || '(None)'
        }
    },
    methods: {
        ...mapActions({
            _logout: 'session/logout'
        }),
        logout() {
            console.log('logout');
            this._logout(this.selected)
                .then(() => this.$router.push({ name: 'SignUp' }))
                .catch((err) => console.error('logout error!', err))
        },
        switchAccount() {
            this.$router.push({ name: 'SignUp' })
        }
    }
}
</script>
