import type { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "load",
    component: () => import("@/views/Load/index.vue")
  },

  {
    path: "/load",
    // hidden: true,
    // props: true,
    component: () => import("@/views/Load/index.vue"),
  },
  {
    path: "/login",
    // hidden: true,
    // props: true,
    component: () => import("@/views/Login/index.vue"),
  },
  {
    path: '/exam',
    name: 'exam',
    component: () => import("../views/Exam/index.vue"),
    meta: { hidetopbar: true, title: '爱心传递' }
  },
  {
    path: '/examstart',
    component: () => import("@/views/Exam/Examstart.vue"),
    meta: { hidefooter: true, isDialog: true, title: '答题' }
  },
];

export default routes;
