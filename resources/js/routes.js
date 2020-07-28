import Home from "./components/Home.vue";
import VueRouter from "vue-router";

const routes = [
    {
        path: "/",
        component: Home,
        name: "home"
    }
];

const router = new VueRouter({
    routes
});

export default router;
