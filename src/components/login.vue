<template>
    <section class="is-fullheight is-vertical-center" style="margin-top: 20vh;">
        <h2 class="is-centered title">金山学院 - 成绩速查</h2>
        <b-field label="学号">
            <b-input v-model="username" required></b-input>
        </b-field>

        <b-field label="密码">
            <b-input type="password" v-model="password" required></b-input>
        </b-field>
        <button class="button is-fullwidth" @click="login">查询</button>
        <b-notification v-for="(msg,index) in messages" :key="index">{{msg}}</b-notification>
    </section>
</template>

<script>
    const url = process.env.VUE_APP_ADDRESS;
    export default {
        name: "login",
        data: () => {
            return {
                username: "",
                password: "",
                messages: [],
            };
        },
        methods: {
            login: function () {
                if (!this.username || !this.password) {
                    return;
                }
                this.loginActive(this.username, this.password)
            },
            loginActive: function (user, pass) {
                fetch(url + "/login/" + user + "/" + pass).then((resp) => {
                    return resp.json()
                }).then((data) => {
                    if (data.result < 1) {
                        this.messages.push(data.message);
                        return;
                    }
                    this.$emit("done", data.data);
                })
            }
        }
    }
</script>

<style scoped>

</style>