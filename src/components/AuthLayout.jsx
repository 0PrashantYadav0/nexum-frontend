import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true}) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const {workerFirst} = useSelector((state) => state.user);
  console.log(workerFirst)
  const authStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/sign-in");
    } else if (workerFirst && currentUser && currentUser.user.role === "WORK") {
        navigate("/worker-form");
    }
    else if (!authentication && authStatus !== authentication) {
        navigate("/");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}
