import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect } from "react";
import Unauthorized from "../components/Unauthorized";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  roles: string[];
}

export function PrivateRoute({
  component: Component,
  roles,
}: PrivateRouteProps) {
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div className="text-5xl">Loading...</div>;
  }

  const isAuthorized = (roles: string[]) => {
    if (keycloak && roles) {
      return roles.some((r) => {
        const realm = keycloak.hasRealmRole(r);
        const resource = keycloak.hasResourceRole(r);
        return realm || resource;
      });
    }
    return false;
  };

  return isAuthorized(roles) ? <Component /> : <Unauthorized />;
}
