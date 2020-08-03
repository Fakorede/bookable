require("./bootstrap");

import Vue from "vue";
import VueRouter from "vue-router";
import moment from "moment";

import router from "./routes";
import Index from "./Index.vue";
import StarRating from "./components/StarRating.vue";
import FatalError from "./components/FatalError.vue";
import ValidationErrors from "./components/ValidationErrors.vue";

Vue.use(VueRouter);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("v-errors", ValidationErrors);

const app = new Vue({
    el: "#app",
    router,
    components: {
        Index: Index
    }
});
