"use client";
import SideMenu from "./_components/SideMinu";
import { UserProvider, UserContext } from "./_context/Current";
import { useContext } from "react";

export default function RootLayout({ children }) {
  const user = useContext(UserContext);

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <UserProvider>
        {user.token && <SideMenu />}
        {children}
      </UserProvider>
    </div>
  );
}
