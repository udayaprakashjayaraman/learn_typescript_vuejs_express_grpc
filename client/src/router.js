import { createWebHistory, createRouter } from "vue-router";
const routes = [
    {
        path: "/",
        alias: "/products",
        name: "products",
        component: () => import("./components/ProductList.vue"),
    },
    {
        path: "/products/:id",
        name: "product-details",
        component: () => import("./components/ProductDetails.vue"),
    },
    {
        path: "/add",
        name: "add",
        component: () => import("./components/AddProduct.vue"),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
//# sourceMappingURL=router.js.map