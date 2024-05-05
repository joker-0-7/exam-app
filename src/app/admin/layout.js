import { Inter } from "next/font/google";
import SideMinu from "./_components/SideMinu";
import { UserProvider } from "./_context/Current";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div className="grid grid-cols-12 gap-4 lg:gap-8">
      <UserProvider>
        <div className="col-span-2">
          <SideMinu />
        </div>
        <div className="h-screen col-span-10">{children}</div>
      </UserProvider>
    </div>
  );
}
