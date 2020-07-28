require("./bootstrap");

import Vue from "vue";
import router from "./routes";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const app = new Vue({
    el: "#app",
    router
});
