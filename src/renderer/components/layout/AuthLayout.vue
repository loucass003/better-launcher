<template>
    <v-content class="auth-content">
        <v-layout align-center justify-center row fill-height>
            <router-view></router-view>
        </v-layout>
    </v-content>
</template>

<script>
export default {
    name: 'AuthLayout'
}
</script>

<style lang="stylus">
    .auth-content {
        min-height: 100vh; 
        background-image: url(/static/signup-bg.jpg);
        background-size: cover;
    }
</style>


