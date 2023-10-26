import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "../store";

const PublicRoute: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { clientToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (clientToken) {
      navigate("/");
    } else {
      navigate("/login");
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientToken]);

  if (isLoading) return <h3>Loading....</h3>;

  return <>{children}</>;
};

export default PublicRoute;
