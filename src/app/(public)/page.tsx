import { Footer } from "./_components/Footer";
import Header from "./_components/Header";
import Hero from "./_components/hero";
import { Professionals } from "./_components/professionals";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div>
        <Hero />
        <Professionals />
      </div>
      <Footer/>
    </main>
  );
}
