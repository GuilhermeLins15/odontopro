"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function DialogService() {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Novo Serviço</DialogTitle>
        <DialogDescription>Adicione um novo serviço</DialogDescription>
      </DialogHeader>
      <div>
        <h1>Conteudo Modal</h1>
      </div>
    </>
  );
}
