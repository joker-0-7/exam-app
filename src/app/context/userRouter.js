"use client";
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "./User";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

function UserRouter({ children }) {
  const [ok, setOk] = useState(false);
  const pathName = usePathname();
  const router = useRouter();
  const [state] = useContext(UserContext);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/users/current`
      );
      if (res.data.ok) setOk(true);
    } catch (error) {
      if (pathName.split("/").includes("admin"))
        return router.push("/admin/login");
      router.push("/login");
    }
  };

  if (!ok && !pathName.split("/").includes("login")) {
    return null;
  }

  return <>{children}</>;
}

export default UserRouter;
