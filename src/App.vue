<template>
    <section class="component" id="ahaha">
        <div class="logo"></div>
        <div class="container">
            <template v-if="id">
                <transcript :session="id"></transcript>
                <a class="button is-primary is-fullwidth" @click="id = ''">返回</a>
            </template>
            <template v-else>
                <login @done="onLogin" />
            </template>
        </div>
    </section>
</template>

<script>
    import login from './components/login.vue'
    import Transcript from "./components/transcript";

    export default {
        name: 'app',
        components: {
            Transcript,
            login,
        },
        data: () => {
            return {
                id: "",
            };
        },
        methods: {
            onLogin: function (key) {
                this.id = key;
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .component {
        padding: 1.5rem;
    }
    #ahaha{
        position: relative;
    }
    .logo{
    }
</style>
