import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta
          name="description"
          content="E-commerce website where users can mark the categories that they are interested in."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1>ECOMMERCE</h1>
      </main>
    </>
  );
}
