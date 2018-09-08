<template>
  <div id="app">
	<v-app dark>
		<v-system-bar app window dark class="system-bar">
			Better Launcher
			<v-spacer></v-spacer>
			<v-btn icon small @click.stop="() => { console.log('test') }">
				<v-icon>remove</v-icon>
			</v-btn>
			<v-btn icon small>
				<v-icon>check_box_outline_blank</v-icon>
			</v-btn>
			<v-btn icon small>
				<v-icon>close</v-icon>
			</v-btn>
		</v-system-bar>
		<v-snackbar
			v-model="snackbar"
			left
			multi-line
			timeout="3000"
			top
		>
			{{ text }}
			<v-btn
				color="pink"
				flat
				@click="snackbar = false"
			>
				Close
			</v-btn>
		</v-snackbar>
		<v-slide-y-transition mode="out-in">
			<auth-layout v-if="!isAuth"></auth-layout>
			<layout v-else></layout>
        </v-slide-y-transition>
	</v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Layout from './components/layout/Layout'
import AuthLayout from './components/layout/AuthLayout'

export default {
	name: 'better-launcher',
	components: {
		Layout,
		AuthLayout
	},
	computed: {
		...mapGetters({
			selected: 'session/selected',
		}),
		isAuth() {
			/*const needAuth = !this.$route.path.startsWith('/auth/');
			console.log("layout selected", needAuth, !this.selected, this.$route.path)
			if (needAuth && !this.selected) {
				this.$router.push({ name: 'SignUp' })	
			}*/
			return !this.$route.path.startsWith('/auth/')
		}
	}
}
</script>

<style lang="stylus">
	@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
	/* Global CSS */

	.system-bar {
		-webkit-user-select: none;
  		-webkit-app-region: drag;
		padding: 0px 0px 0px 8px

		.v-icon {
			margin-right 0
		}

		* {
			-webkit-app-region: no-drag;
		}
	}
</style>
