
import testa from "@EXP/1.vue"
import testb from "@EXP/2.vue"
import ExsampleIndexPage from "@EXP/ExsampleIndexPage"
// 懒加载路由
const router = [
  {
    path: '/testa', component: testa,
    name: 'testa'
  },
  {
    path: '/testb', component: testb,
    name: 'testb'
  },
  {
    path: '/', component: ExsampleIndexPage,
    name: 'mainpage'
  }

]
export default router;

