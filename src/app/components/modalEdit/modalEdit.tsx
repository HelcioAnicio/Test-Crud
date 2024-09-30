"use client";

import axios from "axios";
import { Minus } from "lucide-react";
import React, { useState } from "react";

interface ModalEditProps {
  closeModal: () => void;
  categories: { id: number; category: string }[];
  campaign: Campaign;
}

interface Campaign {
  id: number;
  title: string;
  dataCreation: string;
  beginCampaign: string;
  endCampaign: string;
  status: string;
  category: string;
}

export const ModalEdit = ({
  closeModal,
  categories,
  campaign,
}: ModalEditProps) => {
  const [editCampaignData, setEditCampaignData] = useState<Campaign>({
    id: campaign.id,
    title: campaign.title,
    dataCreation: campaign.dataCreation,
    beginCampaign: campaign.beginCampaign,
    endCampaign: campaign.endCampaign,
    status: campaign.status,
    category: campaign.category,
  });

  const sendForm = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log(editCampaignData);
    axios
      .patch(
        `https://json-server-wb8q.onrender.com/campaigns/${editCampaignData.id}`,
        editCampaignData,
      )
      .then((response) => {
        console.log("Campanha editada com sucesso", response);
      })
      .catch((error) => {
        console.error("Erro ao editar a campanha", error);
      });
    closeModal();
  };

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setEditCampaignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div
        className="fixed bottom-0 flex h-full w-full flex-col bg-black bg-opacity-85"
        onClick={closeModal}
      >
        <div
          className="absolute bottom-0 z-20 flex h-5/6 w-full flex-col rounded-t-3xl bg-gray-800"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex w-full justify-center">
            <Minus size={50} />
          </div>
          <form
            action=""
            method="post"
            className="flex h-full flex-col gap-5 px-4 pb-8"
          >
            <div className="gap2 flex flex-col">
              <label className="text-gray-400" htmlFor="title">
                Título:
              </label>
              <input
                className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
                type="text"
                id="title"
                name="title"
                value={editCampaignData.title}
                onChange={handleChangeValue}
              />
            </div>

            <div className="gap2 flex flex-col">
              <label className="text-gray-400" htmlFor="beginCampaign">
                Data de Início:
              </label>
              <input
                className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
                type="date"
                id="beginCampaign"
                name="beginCampaign"
                value={editCampaignData.beginCampaign}
                onChange={handleChangeValue}
              />
            </div>

            <div className="gap2 flex flex-col">
              <label className="text-gray-400" htmlFor="endCampaign">
                Data de Fim:
              </label>
              <input
                className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
                type="date"
                id="endCampaign"
                name="endCampaign"
                value={editCampaignData.endCampaign}
                onChange={handleChangeValue}
              />
            </div>

            <div className="gap2 flex flex-col">
              <label className="text-gray-400" htmlFor="status">
                Status:
              </label>
              <select
                className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
                id="status"
                name="status"
                value={editCampaignData.status}
                onChange={handleChangeValue}
              >
                <option className="text-black" value="" disabled>
                  Selecione um Status
                </option>
                <option className="text-black" value="ativa">
                  Ativa
                </option>
                <option className="text-black" value="pausada">
                  Pausada
                </option>
                <option className="text-black" value="expirada">
                  Expirada
                </option>
              </select>
            </div>

            <div className="gap2 flex flex-col">
              <label className="text-gray-400" htmlFor="category">
                Categoria:
              </label>
              <select
                className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
                id="category"
                name="category"
                value={editCampaignData.category}
                onChange={handleChangeValue}
              >
                <option disabled className="text-black" value="">
                  Selecione uma categoria
                </option>
                {categories.map((category) => (
                  <option
                    className="text-black"
                    key={category.id}
                    value={category.category}
                  >
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 flex justify-between">
              <button
                type="submit"
                className="w-28 rounded-md border bg-wrong p-2"
                onChange={closeModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-28 rounded-md border bg-green p-2"
                onClick={sendForm}
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
