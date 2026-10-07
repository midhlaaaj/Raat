import { AccountNav } from "@/components/account/account-nav";

export const metadata = { title: "Your Account — RAAT" };

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-bg">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-6 pb-28 pt-10 md:grid-cols-[260px_1fr] md:gap-14 md:px-10 md:pt-14">
        <AccountNav />
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
