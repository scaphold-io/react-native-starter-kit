import App from './../components/App/App';
import About from './../components/App/About';
import Home from './../components/HackerNewsClone/Home';

import AppRoute from './../routes/AppRoute';
import AboutRoute from './../routes/AboutRoute';
import HomeRoute from './../routes/HomeRoute';


export function appNavigatorRoute() {
  return {
    // App is a Relay.Container
    Component: App,
    queryConfig: new AppRoute()
  };
}

export function aboutNavigatorRoute() {
  return {
    // About is a Relay.Container
    title: 'About',
    leftButton: 'Back',
    Component: About,
    queryConfig: new AboutRoute()
  };
}

export function homeNavigatorRoute(email) {
  return {
    // Home is a Relay.Container
    title: 'HackerNews Clone',
    rightButton: 'Logout',
    Component: Home,
    queryConfig: new HomeRoute({email: email.email, orderBy: '-createdAt'})
  };
}