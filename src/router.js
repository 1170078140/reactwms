import Login from './component/Login';
import Index from './component/Index';
import Home from './component/Home';
import ItemProperty from './component/baseData/ItemProperty';
import Partspackage from './component/baseData/Partspackage';
import Inventory from './component/QueryCenter/Inventory';
import PrintByParts from './component/PrintCenter/PrintByParts';
import ReceiptList from './component/ReceiveMGT/ReceiptList';
import QualityManagement from './component/INWHMGT/QualityManagement';
import Pickpull from './component/Picking/Pickpull';
import ConsignmentPickingTask from './component/Picking/ConsignmentPickingTask'

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
  },
  {
    path:'/inventory',
    component:Inventory
  },
  {
    path:'/printByParts',
    component:PrintByParts
  },
  {
    path:'/receipt-list',
    component:ReceiptList
  },
  {
    path:'/QualityManagement',
    component:QualityManagement
  },
  {
    path:'/pickpull',
    component:Pickpull
  },
  {
    path:'/ConsignmentPickingTask',
    component:ConsignmentPickingTask
  },
]

export default router