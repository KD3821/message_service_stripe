import store from "@/store/store";
import { createRouter, createWebHistory } from "vue-router";
import { IS_USER_AUTHENTICATED_GETTER } from "@/store/storeConstants";
import HomePage from "@/pages/HomePage";
import ErrorPage from "@/pages/ErrorPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";
import CustomersPage from "@/pages/CustomersPage";
import CustomerDetailsPage from "@/pages/CustomerDetailsPage";
import CampaignsPage from "@/pages/CampaignsPage";
import CampaignDetailsPage from "@/pages/CampaignDetailsPage";
import CampaignControlsPage from "@/pages/CampaignControlsPage";
import AddCampaignPage from "@/pages/AddCampaignPage";
import AddCustomerPage from "@/pages/AddCustomerPage";
import CheckoutResultPage from "@/pages/CheckoutResultPage";

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/error',
        component: ErrorPage,
        meta: { loggedIn: true }
    },
    {
        path: '/register',
        component: RegisterPage,
        meta: { loggedIn: false }
    },
    {
        path: '/login',
        component: LoginPage,
        meta: { loggedIn: false }
    },
    {
        path: '/campaigns',
        component: CampaignsPage,
        meta: { loggedIn: true }
    },
    {
        name: 'campaignDetails',
        path: '/campaigns/:id',
        component: CampaignDetailsPage,
        meta: { loggedIn: true }
    },
    {
        name: 'campaignControls',
        path: '/campaigns/:id/controls',
        component: CampaignControlsPage,
        meta: { loggedIn: true }
    },
    {
        path: '/campaigns/add',
        component: AddCampaignPage,
        meta: { loggedIn: true }
    },
    {
        path: '/customers',
        component: CustomersPage,
        meta: { loggedIn: true }
    },
    {
        name: 'customerDetails',
        path: '/customers/:id',
        component: CustomerDetailsPage,
        meta: { loggedIn: true }
    },
    {
        name: 'customerEdit',
        path: '/customers/:id/:action',
        component: CustomerDetailsPage,
        meta: { loggedIn: true }
    },
    {
        path: '/customers/add',
        component: AddCustomerPage,
        meta: { loggedIn: true }
    },
    {
        path: '/checkout/:id/:result',
        component: CheckoutResultPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
    if (
        'loggedIn' in to.meta &&
        to.meta.loggedIn &&
        !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
    ) {
        next('/login');
    } else if (
        'loggedIn' in to.meta &&
        !to.meta.loggedIn &&
        store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`]
    ) {
        next('/');
    } else {
        next();
    }
})

export default router;