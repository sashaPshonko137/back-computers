import React from "react";

import { Routes, Route } from "react-router-dom";

import { TAppRouteProps, routeConfig } from "configs/route-config";

import { RequireAdmin } from "./RequireAdmin";
import { RequireAuth } from "./RequireAuth";

export const AppRouter = () => {
  const renderWithWrapper = React.useCallback((route: TAppRouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.adminOnly ? (
            <RequireAdmin>{route.element}</RequireAdmin>
          ) : route.authOnly ? (
            <RequireAuth>{route.element}</RequireAuth>
          ) : (
            route.element
          )
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
