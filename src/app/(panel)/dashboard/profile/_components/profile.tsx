"use client";

import { ProfileFormData, useProfileForm } from "./profile-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useState } from "react";
import Image from "next/image";

import imgTest from "../../../../../../public/foto1.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Prisma } from "@/generated/prisma/client";



type UserWithSubscription = Prisma.UserGetPayload<{
  include: {
    subscription: true;
  };
}>;

interface ProfileContentProps {
  user: UserWithSubscription;
}

export default function ProfileContent({ user }: ProfileContentProps) {

  const [selectedHours, setSelectedHours] = useState<string[]>(user.times ?? []);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useProfileForm({name: user.name, address: user.address, phone: user.phone, status: user.status, timeZone: user.timeZone});

  function generateTimeSlots(): string[] {
    const hours: string[] = [];

    for (let i = 8; i <= 24; i++) {
      for (let j = 0; j < 2; j++) {
        const hour = i.toString().padStart(2, "0");
        const minute = (j * 30).toString().padStart(2, "0");

        hours.push(`${hour}:${minute}`);
      }
    }

    return hours;
  }

  const hours = generateTimeSlots();

  function toggleHour(hour: string) {
    setSelectedHours((prev) =>
      prev.includes(hour)
        ? prev.filter((h) => h !== hour)
        : [...prev, hour].sort(),
    );
  }

  const timeZones = Intl.supportedValuesOf("timeZone").filter(
    (zone) =>
      zone.startsWith("America/Sao_Paulo") ||
      zone.startsWith("America/Fortaleza") ||
      zone.startsWith("America/Recife") ||
      zone.startsWith("America/Bahia") ||
      zone.startsWith("America/Belem") ||
      zone.startsWith("America/Manaus") ||
      zone.startsWith("America/Cuiaba") ||
      zone.startsWith("America/Boa_Vista"),
  );

  async function onSubmit(values: ProfileFormData) {
    const profileData = {
      ...values,
      times: selectedHours,
    };
    console.log("ENTROU NO SUBMIT", profileData);
  }

  return (
    <div className="mx-auto space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) => {
            console.log("ERROS:", errors);
          })}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-2xl font-bold">
                Meu Perfil
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="bg-gray-200 relative h-40 w-40 rounded-full overflow-hidden">
                  <Image
                    src={user.image ? user.image : imgTest}
                    alt="Foto de perfil"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* NOME */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "font-semibold",
                          fieldState.error && "text-destructive",
                        )}
                      >
                        Nome da clinica
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Digite o nome da clinica..."
                          {...field}
                        />
                      </FormControl>

                      {fieldState.error && (
                        <p className="text-destructive text-sm">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* ENDEREÇO */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "font-semibold",
                          fieldState.error && "text-destructive",
                        )}
                      >
                        Endereço completo
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Digite o endereço da clinica..."
                          {...field}
                        />
                      </FormControl>

                      {fieldState.error && (
                        <p className="text-destructive text-sm">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* TELEFONE */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "font-semibold",
                          fieldState.error && "text-destructive",
                        )}
                      >
                        Telefone
                      </FormLabel>

                      <FormControl>
                        <Input placeholder="Digite o telefone..." {...field} />
                      </FormControl>

                      {fieldState.error && (
                        <p className="text-destructive text-sm">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* STATUS */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "font-semibold",
                          fieldState.error && "text-destructive",
                        )}
                      >
                        Status da clínica
                      </FormLabel>

                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value ? "active" : "inactive"}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o status da clínica" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="active">
                              ATIVO (clínica ativa)
                            </SelectItem>

                            <SelectItem value="inactive">
                              INATIVO (clínica inativa)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>

                      {fieldState.error && (
                        <p className="text-destructive text-sm">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* HORÁRIOS */}
                <div className="space-y-2">
                  <Label className="font-semibold">
                    Configurar horário da clinica
                  </Label>

                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger
                      render={
                        <Button
                          variant="outline"
                          className="w-full justify-between"
                        />
                      }
                    >
                      Clique aqui para selecionar horários
                      <ArrowRight className="h-5 w-5" />
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Horários da clinica</DialogTitle>

                        <DialogDescription>
                          Selecione abaixo os horários disponíveis para sua
                          clínica:
                        </DialogDescription>
                      </DialogHeader>

                      <div className="py-4">
                        <p className="text-sm text-muted-foreground mb-2">
                          Clique nos horários abaixo para marcar ou desmarcar:
                        </p>

                        <div className="grid grid-cols-5 gap-2">
                          {hours.map((hour) => (
                            <Button
                              type="button"
                              key={hour}
                              variant="outline"
                              className={cn(
                                "h-10 rounded-sm",
                                selectedHours.includes(hour) &&
                                  "border-2 border-emerald-500 text-primary",
                              )}
                              onClick={() => toggleHour(hour)}
                            >
                              {hour}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <Button
                          type="button"
                          className="w-full rounded-sm h-10"
                          onClick={() => setDialogOpen(false)}
                        >
                          Salvar horários
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* FUSO HORÁRIO */}
                <FormField
                  control={form.control}
                  name="timeZone"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(
                          "font-semibold",
                          fieldState.error && "text-destructive",
                        )}
                      >
                        Selecione o fuso horário
                      </FormLabel>

                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o seu fuso horário" />
                          </SelectTrigger>

                          <SelectContent>
                            {timeZones.map((zone) => (
                              <SelectItem key={zone} value={zone}>
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      {fieldState.error && (
                        <p className="text-destructive text-sm">
                          {fieldState.error.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                {/* BOTÃO */}
                <Button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-400"
                >
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
}
