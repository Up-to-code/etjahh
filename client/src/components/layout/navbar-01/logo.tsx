import Image from "next/image";
import Link from "next/link";

export const Logo = ({ logo_name }: { logo_name?: string }) => (
  <Link href="/">
    <div className="flex items-center gap-2 mt-2">
      <Image src="/Logo.svg" alt="Strapi Logo" width={150} height={50} />
      {/* <span className="text-secondary text-3xl font-bold  sm:text-base md:text-lg">
        {logo_name}
      </span> */}
    </div>
  </Link>
);
