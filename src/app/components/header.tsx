import { HEADER } from "config/header";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="mx-auto flex max-w-[1440px] flex-col gap-y-4 px-10 pb-4 pt-3">
      <section>
        <div className="ml-auto flex w-fit gap-x-5">
          {HEADER.Options.map((option) => (
            <p key={option} className="text-xs leading-[14.25px] text-carbon">
              {option}
            </p>
          ))}
        </div>
      </section>

      <section className="flex items-baseline justify-between">
        <Link href="/">
          <h1 className="text-[32px] font-bold leading-[39px]">ECOMMERCE</h1>
        </Link>
        <nav className="flex gap-x-8">
          {HEADER.QuickLinks.map((item) => (
            <p key={item} className="font-semibold leading-[19px]">
              {item}
            </p>
          ))}
        </nav>
        <div className="flex gap-x-8 self-end">
          <Image src="./assets/search.svg" alt="" height={32} width={32} />
          <Image src="./assets/cart.svg" alt="" height={32} width={32} />
        </div>
      </section>
    </header>
  );
}

export default Header;
