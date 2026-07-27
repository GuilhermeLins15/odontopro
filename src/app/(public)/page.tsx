import Header from "./_components/Header";
import Hero from "./_components/hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div>
        <Hero />
      </div>
    </main>
  );
}
