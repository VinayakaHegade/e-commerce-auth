import Image from "next/image";

function OfferBar() {
  return (
    <section className="flex min-h-9 w-screen items-center justify-center gap-x-6 bg-zinc-150 pb-2 pt-[10px]">
      <Image
        src="assets/lesser.svg"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4"
      />
      <h2 className="text-sm font-medium leading-[17px]">
        Get 10% off on business sign up
      </h2>
      <Image
        src="assets/greater.svg"
        alt=""
        width={16}
        height={16}
        className="h-4 w-4"
      />
    </section>
  );
}

export default OfferBar;
