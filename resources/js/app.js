require("./bootstrap");

import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";
import moment from "moment";

import router from "./routes";
import Index from "./Index.vue";
import StarRating from "./components/StarRating.vue";
import FatalError from "./components/FatalError.vue";
import Success from "./components/Success.vue";
import ValidationErrors from "./components/ValidationErrors.vue";
import storeDefinition from "./store";

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.filter("fromNow", value => moment(value).fromNow());

Vue.component("star-rating", StarRating);
Vue.component("fatal-error", FatalError);
Vue.component("success", Success);
Vue.component("v-errors", ValidationErrors);

const store = new Vuex.Store(storeDefinition);

const app = new Vue({
    el: "#app",
    router,
    store,
    components: {
        Index: Index
    },
    beforeCreate() {
        this.$store.dispatch("loadStoredState");
    }
});
