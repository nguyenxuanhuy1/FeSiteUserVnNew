import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Router/router";
import NProgressHandler from "./Custom/NProgress";
import './Styles/index.scss'
const App = () => {
  return (
    <Router>
      <NProgressHandler />
      <Routes>
        {routes.map((route, index) => {
          const Component = route.component;
          const Layout = route.layout || React.Fragment;

          return (
            <Route
              key={`${route.path}-${index}`}
              path={route.path}
              element={
                <Suspense fallback={<div></div>}>
                  <Layout>
                    {route.protected ? (
                        <Component />
                    ) : (
                      <Component />
                    )}
                  </Layout>
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default React.memo(App);
