import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board/index.vue'
import BoardForm from '@/components/BoardForm/index.vue'
// import BoardsComponent from '@/components/Boards/index.vue'
import ListForm from '@/components/ListForm/index.vue'
import CardForm from '@/components/CardForm/index.vue'
import CardEditForm from '@/components/CardEditForm/index.vue'
import ListsComponent from '@/components/Lists/index.vue'
import ListEditFormComponent from '@/components/ListEditForm/index.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/boards/:boardID',
    name: 'board',
    component: Board,
    props: true
  },
  {
    path: '/boards/:boardID/lists',
    name: 'ListsComponent',
    component: ListsComponent,
    props: true
  },
  {
    path: '/boards/:boardID/listform',
    name: 'listform',
    component: ListForm,
    props: true
  },
  {
    path: '/boards/:boardID/editlist',
    name: 'listeditform',
    component: ListEditFormComponent,
    props: true
  },
  {
    path: '/boards/:boardID/cardform',
    name: 'cardform',
    component: CardForm,
    props: true
  },
  {
    path: '/boards/:boardID/cardeditform',
    name: 'cardeditform',
    component: CardEditForm,
    props: true
  },
  {
    path: '/boardform',
    name: 'boardform',
    component: BoardForm,
    props: true
  }]
})
