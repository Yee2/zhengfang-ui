<template>
    <section>
        <b-loading is-full-page="true" :active="loading" can-cancel="false"></b-loading>
        <b-notification v-for="(msg,index) in messages" :key="index">{{msg}}</b-notification>
        <b-tabs type="is-toggle-rounded" expanded>
            <b-tab-item v-for="(data,years) in list" :key="years" :label="years">
                <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                    <thead>
                    <tr>
                        <td>名称</td>
                        <td>分数</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in data" :key="index">
                        <td>{{item.name}}</td>
                        <td :class="{'has-text-danger':item.score < 60 && item.second < 60}">
                            {{item.score}}
                            <span v-if="item.second > 0">(补考:{{item.second}})</span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script>
    const url = process.env.VUE_APP_ADDRESS;
    export default {
        name: "transcript",
        props: {
            session: String,
        },
        data: () => {
            return {
                messages: [],
                list: {},
                loading: true,
            }
        },
        computed: {},
        mounted: function () {
            this.fetch();
        },
        methods: {
            fetch: function () {
                fetch(url + "/transcript/" + this.session)
                    .then((resp) => resp.json())
                    .then((data) => {
                        if (data.result < 1) {
                            this.messages.push(data.message);
                            return;
                        }
                        for (let item of data.data) {
                            if (this.list[item.Years] === undefined) {
                                this.list[item.Years] = [];
                            }
                            this.list[item.Years].push({name: item.Name, score: item.Score,second:item.SecondScore})
                        }
                        this.loading = false;
                    })
                    .catch((e) => {
                        this.messages.push(e.message);
                    });
            }
        }
    }
</script>

<style scoped>

</style>