"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  useDialogServiceForm,
  DialogServiceFormData,
} from "./dialog-servise-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { convertRealToCents } from "@/utils/convertCurrency";
import { createNewService } from "../_actions/create-service";
import { toast } from "sonner";
import { useState } from "react";
import { updateService } from "../_actions/update-service";

interface DialogServiceProps {
  closeModal: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export default function DialogService({
  closeModal,
  serviceId,
  initialValues,
}: DialogServiceProps) {
  const form = useDialogServiceForm({ initialValues });
  const [loading, setLoading] = useState(false);

  async function onSubmit(values: DialogServiceFormData) {
    setLoading(true);
    const priceInCents = convertRealToCents(values.price);
    const hours = parseInt(values.hours) || 0;
    const minutes = parseInt(values.minutes) || 0;
    const duration = hours * 60 + minutes;

    if (serviceId) {
      await updateServiceById({
        serviceId,
        name: values.name,
        priceInCents,
        duration,
      });
      setLoading(false);
      toast.success("Serviço atualizado com sucesso!");
      handleCloseModal();
      return;
    }

    const response = await createNewService({
      name: values.name,
      price: priceInCents,
      duration: duration,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Serviço adicionado com sucesso!");
    handleCloseModal();
  }

  async function updateServiceById({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string;
    name: string;
    priceInCents: number;
    duration: number;
  }) {
    const response = await updateService({
      serviceId,
      name,
      price: priceInCents,
      duration,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast(response.data);
    handleCloseModal();
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;

    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/(\B)(?=(\d{3})+(?!\d))/g, ".");
    }

    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="font-semibold">Novo Serviço</DialogTitle>
        <DialogDescription>Adicione um novo serviço</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">
                    Nome do serviço:
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Digite o nome do serviço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">
                    Valor do serviço:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: 120,00"
                      {...field}
                      onChange={changeCurrency}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="font-semibold">Tempo de duração do serviço:</p>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">Horas:</FormLabel>
                    <FormControl>
                      <Input placeholder="1" type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="minutes"
                render={({ field }) => (
                  <FormItem className="my-2">
                    <FormLabel className="font-semibold">Minutos:</FormLabel>
                    <FormControl>
                      <Input placeholder="0" type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full rounded-sm mt-2 font-semibold text-white"
              disabled={loading}
            >
              {" "}
              {initialValues
                ? loading
                  ? "Atualizando..."
                  : "Atualizar serviço"
                : loading
                  ? "Adicionando..."
                  : "Adicionar serviço"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
