import { lazy } from 'react';
import BaseUrl from './path';
import MainLayout from '../Layout/Mainlayout';
const Home = lazy(() => import('../Page/Home/Home'));
const ThoiSu = lazy(() => import('../Page/Components/Card/NewChung/NewsChung'));
const Detail = lazy(() => import('../Page/Components/Card/Details/CardDetails'));
const Login = lazy(() => import('../Page/Components/login'));
const Register = lazy(() => import('../Page/Components/register/index'));
const NotFound = lazy(() => import('../Components/DB/NotFound'));
const Video = lazy(() => import('../Page/Components/Card/CardVideo/DetailVideo'));
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
    path: BaseUrl.NotFound,
    component: NotFound,
    layout: MainLayout,
  },
  {
    path: BaseUrl.ThoiSu,
    component: ThoiSu,
    layout: MainLayout,
  },
  {
    path: BaseUrl.Video,
    component: Video,
    layout: MainLayout,
  },
  {
    path: BaseUrl.Detail,
    component: Detail,
    layout: MainLayout,
  },
  {
    path: BaseUrl.Login,
    component: Login,
  },
  {
    path: BaseUrl.Register,
    component: Register,
  }
];

export default routes;
