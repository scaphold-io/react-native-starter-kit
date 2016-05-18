import App from './../components/App/App';
import About from './../components/App/About';
import Home from './../components/HackerNewsClone/Home';

import AppRoute from './../routes/AppRoute';
import AboutRoute from './../routes/AboutRoute';
import HomeRoute from './../routes/HomeRoute';


export function appNavigatorRoute() {
  return {
    // title: 'App',
    // App is a Relay.Container
    Component: App,
    queryConfig: new AppRoute()
  };
}

export function aboutNavigatorRoute() {
  return {
    title: 'About',
    leftButton: 'Back',
    // App is a Relay.Container
    Component: About,
    queryConfig: new AboutRoute()
  };
}

export function homeNavigatorRoute(email) {
  return {
    title: 'HackerNews Clone',
    rightButton: 'Logout',
    // Home is a Relay.Container
    Component: Home,
    queryConfig: new HomeRoute({email: email.email, orderBy: '-createdAt'})
  };
}