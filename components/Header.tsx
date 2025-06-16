import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const Header = async () => {
  const session = await auth();
  const name = session?.user?.name || "User";
  const initials = getInitials(name);

  return (
    <header className="my-10 flex justify-between gap-x-1 px-4 sm:px-6 md:px-8">
      <Link href="/" className="flex items-center gap-1 flex-grow min-w-0">
        <Image src="/icons/logo.svg" alt="logo" width={28} height={28} className="shrink-0" />
        <h1 className="font-bebas-neue text-sm sm:text-base md:text-xl lg:text-4xl text-light-100 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap hidden sm:block">Bazu Library</h1>
      </Link>

      <ul className="flex flex-row items-center gap-x-1 shrink-0">
        <li>
          <Link href="/my-profile">
            <Avatar className="w-8 h-8 cursor-pointer shrink-0">
              <AvatarFallback className="bg-amber-100 text-sm">{initials}</AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
