import { HEADER } from "config/header";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="mx-auto flex max-w-[1440px] flex-col gap-y-4 px-4 pb-4 pt-3 md:px-10">
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
        <nav className="hidden gap-x-8 min-[930px]:flex">
          {HEADER.QuickLinks.map((item) => (
            <p key={item} className="font-semibold leading-[19px]">
              {item}
            </p>
          ))}
        </nav>
        <div className="flex gap-2 self-end sm:gap-x-8">
          <Image src="./assets/search.svg" alt="" height={32} width={32} />
          <Image src="./assets/cart.svg" alt="" height={32} width={32} />
        </div>
      </section>
    </header>
  );
}

export default Header;
