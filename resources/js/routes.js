import VueRouter from "vue-router";
import Bookables from "./bookables/Bookables.vue";

const routes = [
    {
        path: "/",
        component: Bookables,
        name: "home"
    }
];

const router = new VueRouter({
    routes
});

export default router;
