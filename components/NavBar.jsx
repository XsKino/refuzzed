"use client";

import Avatar from "@/components/Avatar";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

const links = [
  { href: "#", label: "Market" },
  { href: "/inventory", label: "Inventory" },
];

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center pt-4 backdrop-blur pl-6 lg:px-[20%]">
      <div className="flex gap-2">
        <Link
          className="mr-6 saturate-50 hover:saturate-100 hover:brightness-125"
          href="/"
        >
          <Image src="/favicon.ico" width={64} height={64} className="h-12" />
        </Link>

        {links.map(({ href, label }) => (
          <Link className="px-6 py-4 opacity-75 hover:opacity-100" href={href}>
            {label}
          </Link>
        ))}
      </div>
      <Avatar />
    </nav>
  );
}
