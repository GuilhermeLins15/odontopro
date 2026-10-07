"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Pencil, Plus, X } from "lucide-react";
import { useState } from "react";
import DialogService from "./dialog-service";
import { Service } from "@/generated/prisma/client";
import { convertCentsToReal } from "@/utils/convertCurrency";
import { deleteService } from "../_actions/delete-service";
import { toast } from "sonner";

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDeleteService(
    ev: React.MouseEvent<HTMLButtonElement>,
    serviceId: string,
  ) {
    setLoading(true);
    ev.preventDefault();
    const response = await deleteService({
      serviceId: serviceId,
    });
    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
    setLoading(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl mb:text-2xl font-bold">
              Serviços
            </CardTitle>
            <DialogTrigger render={<Button variant="outline" />}>
              <Plus className="h-5 w-5" />
            </DialogTrigger>

            <DialogContent>
              <DialogService closeModal={() => setDialogOpen(false)} />
            </DialogContent>
          </CardHeader>
          <CardContent>
            <section className="mx-auto mt-4">
              {services.length > 0 ? (
                <>
                  {services.map((service) => (
                    <article
                      key={service.id}
                      className="flex items-center justify-between p-4 border-b last:border-b-0"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="flex-items-center">
                          {service.name}
                        </span>
                        <span className="text-gray-500">-</span>
                        <span className="text-gray-500">
                          {convertCentsToReal(service.price.toString())}
                        </span>
                      </div>
                      <div>
                        <Button variant="ghost" size="icon" onClick={() => {}}>
                          <Pencil className="w-4 h-4">Editar</Pencil>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(ev) => handleDeleteService(ev, service.id)}
                        >
                          <X className="w-4 h-4">Excluir</X>
                        </Button>
                      </div>
                    </article>
                  ))}
                </>
              ) : (
                <p className="text-center text-muted-foreground">
                  Nenhum serviço encontrado.
                </p>
              )}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
