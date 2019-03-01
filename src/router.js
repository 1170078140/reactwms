import Login from './component/Login';
import Index from './component/Index';
import Home from './component/Home';
import ItemProperty from './component/baseData/ItemProperty';
import Partspackage from './component/baseData/Partspackage';

const router = [
  {
    path:'/',
    component:Home,
    exact:true
  },
  {
    path:'/index',
    component:Index, 
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/itemProperty',
    component:ItemProperty
  },
  {
    path:'/partspackage',
    component:Partspackage
  }
]

export default router