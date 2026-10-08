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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleDeleteService(serviceId: string) {
    setLoading(true);

    const response = await deleteService({
      serviceId,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response.data);
  }

  function handleUpdateService(service: Service) {
    setEditingService(service);
    setIsDialogOpen(true);
  }

  function handleOpenChange(open: boolean) {
    setIsDialogOpen(open);

    // Quando fechar o Dialog, limpa o serviço que estava sendo editado
    if (!open) {
      setEditingService(null);
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl mb:text-2xl font-bold">
              Serviços
            </CardTitle>

            {/* Botão para adicionar novo serviço */}
            <DialogTrigger render={<Button variant="outline" />}>
              <Plus className="h-5 w-5" />
            </DialogTrigger>

            <DialogContent>
              <DialogService
                closeModal={() => {
                  setIsDialogOpen(false);
                  setEditingService(null);
                }}
                serviceId={editingService?.id}
                initialValues={
                  editingService
                    ? {
                        name: editingService.name ?? "",
                        price: (editingService.price / 100)
                          .toFixed(2)
                          .replace(".", ","),
                        hours: Math.floor(
                          editingService.duration / 60,
                        ).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="mx-auto mt-4">
              {services.length > 0 ? (
                services.map((service) => (
                  <article
                    key={service.id}
                    className="flex items-center justify-between p-4 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-2">
                      <span>{service.name}</span>

                      <span className="text-gray-500">-</span>

                      <span className="text-gray-500">
                        {convertCentsToReal(service.price.toString())}
                      </span>
                    </div>

                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateService(service)}
                        disabled={loading}
                      >
                        <Pencil className="w-4 h-4" />
                        <span className="sr-only">Editar</span>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteService(service.id)}
                        disabled={loading}
                      >
                        <X className="w-4 h-4" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </div>
                  </article>
                ))
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
