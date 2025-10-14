import { lazy } from 'react';
import BaseUrl from './path';
import MainLayout from '../Layout/Mainlayout';
const Home = lazy(() => import('../Page/Home/Home'));
const ThoiSu = lazy(() => import('../Page/Components/Card/NewChung/NewsChung'));
const Detail = lazy(() => import('../Page/Components/Card/Details/CardDetails'));
export interface AppRoute {
  path: string;
  component: React.ComponentType<any>;
  layout?: React.ComponentType<any>;
  protected?: boolean;
}

const routes: AppRoute[] = [
  {
    path: BaseUrl.Home,
    component: Home,
    layout: MainLayout,
  },
  {
    path: BaseUrl.ThoiSu,
    component: ThoiSu,
    layout: MainLayout,
  },
  {
    path: BaseUrl.Detail,
    component: Detail,
    layout: MainLayout,
  },
];

export default routes;
