import Header from "./components/header";
import OfferBar from "./components/offer-bar";

export default async function Home() {
  return (
    <>
      <Header />
      <OfferBar />
      <main className="mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center">
        <h1>ECOMMERCE</h1>
      </main>
    </>
  );
}
