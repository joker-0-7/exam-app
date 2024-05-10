import { Inter } from "next/font/google";
import SideMinu from "./_components/SideMinu";
import { UserProvider } from "./_context/Current";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <UserProvider>
        <SideMinu />

        {children}
      </UserProvider>
    </div>
  );
}
