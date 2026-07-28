"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogInIcon, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#profissionais", label: "Profissional" },
  { href: "/contatos", label: "Contatos" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const session = null;

  return (
    <header className="fixed top-0 left-0 right-0 z-999 py-4 px-6 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Odonto<span className="text-emerald-500">PRO</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          {navItems.map((item) => (
            <Button
              onClick={() => setIsOpen(!isOpen)}
              key={item.href}
              className="bg-transparent hover:bg-transparent text-black shadow-none"
            >
              <Link href={item.href} className="text-base">{item.label}</Link>
            </Button>
          ))}
          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2"
            >
              Acessar clinica
            </Link>
          ) : (
            <Button>
              <LogInIcon />
              Portal da clinica
            </Button>
          )}
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button
                className="text-black hover:bg-transparent"
                variant="ghost"
                size="icon"
              />
            }
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="right" className="p-8 w-60 sm:w-[300] z-9999">
            <SheetTitle>Menu</SheetTitle>
            <SheetHeader></SheetHeader>
            <SheetDescription>Veja nossos links</SheetDescription>
            <nav className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                <Button
                  onClick={() => setIsOpen(!isOpen)}
                  key={item.href}
                  className="bg-transparent hover:bg-transparent text-black shadow-none"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
              {session ? (
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2"
                >
                  Acessar clinica
                </Link>
              ) : (
                <Button>
                  <LogInIcon />
                  Portal da clinica
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
