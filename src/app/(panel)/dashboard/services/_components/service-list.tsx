"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import DialogService from "./dialog-service";

export function ServiceList() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl mb:text-2xl font-bold">
              Serviços
            </CardTitle>
            <DialogTrigger
              render={
                <Button variant="outline" />
              }
            >
              <Plus className="h-5 w-5" />
            </DialogTrigger>

            <DialogContent>
              <DialogService closeModal={() => setDialogOpen(false)} />
            </DialogContent>
          </CardHeader>
        </Card>
      </section>
    </Dialog>
  );
}
