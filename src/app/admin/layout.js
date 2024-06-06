import SideMenu from "./_components/SideMenu";
import { UserProvider } from "./_context/Current";

export default function RootLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <UserProvider>
        <SideMenu />

        {children}
      </UserProvider>
    </div>
  );
}
