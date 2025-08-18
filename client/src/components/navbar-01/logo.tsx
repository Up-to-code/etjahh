import Image from "next/image";
import Link from "next/link";

export const Logo = ({ logo_name }: { logo_name?: string }) => (
  <Link href="/">
    <div className="flex items-center gap-2 ">
      <Image src="/logo.png" alt="Strapi Logo" width={32} height={32} />
      <span className="text-primary font-bold text-sm sm:text-base md:text-lg">
        {logo_name}
      </span>
    </div>
  </Link>
);
