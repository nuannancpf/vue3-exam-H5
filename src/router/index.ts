import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import NProgress from "@/utils/progress";

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  console.log(from);
  
  const TOKEN = localStorage.getItem("TOKEN")
  if (!TOKEN && to.path == '/exam') {
    next('/login')
  } else {
    next();
  }
})

router.afterEach(() => {
  NProgress.done();
});

export default router
