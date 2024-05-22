import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import { useGetUser } from "hooks/user/use-get-user";

interface IRequireAuthProps {
  children: JSX.Element;
}

export function RequireAuth(props: IRequireAuthProps) {
  const { children } = props;

  const { userData, isUserDataLoading } = useGetUser();

  if (!isUserDataLoading && !userData) {
    return <Navigate to={RouterPath.not_authorized} />;
  }

  return children;
}
