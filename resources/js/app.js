require("./bootstrap");

import Vue from "vue";
import router from "./routes";
import VueRouter from "vue-router";
import Index from "./Index.vue";
import moment from "moment";

Vue.use(VueRouter);

Vue.filter("fromNow", value => moment(value).fromNow());

const app = new Vue({
    el: "#app",
    router,
    components: {
        Index: Index
    }
});
