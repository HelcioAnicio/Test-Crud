"use client";

import axios from "axios";
import { Minus } from "lucide-react";
import React, { useState } from "react";

interface ModalAddProps {
  closeModal: () => void;
  categories: { id: number; category: string }[];
  addCampaign: (newCampaignData: Campaign) => void;
  campaigns: Campaign[];
}

interface Campaign {
  id?: number;
  title: string;
  dataCreation: string;
  beginCampaign: string;
  endCampaign: string;
  status: string;
  category: string;
}

export const ModalAdd = ({
  closeModal,
  categories,
  addCampaign,
  campaigns,
}: ModalAddProps) => {
  const getNextId = (): number => {
    const maxId = campaigns.reduce(
      (max: number, campaign: Campaign) =>
        campaign.id && campaign.id > max ? campaign.id : max,
      0,
    );
    return maxId + 1;
  };

  const [newCampaignData, setNewCampaignData] = useState<Campaign>({
    id: getNextId(),
    title: "",
    dataCreation: new Date().toISOString(),
    beginCampaign: "",
    endCampaign: "",
    status: "",
    category: "",
  });

  const sendForm = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log(newCampaignData);
    axios
      .post("http://localhost:3000/campaigns", {
        id: getNextId(),
        title: newCampaignData.title,
        dataCretion: new Date().toISOString(),
        beginCampaign: newCampaignData.beginCampaign,
        endCampaign: newCampaignData.endCampaign,
        status: newCampaignData.status,
        category: newCampaignData.category,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.error(error);
      });

    addCampaign(newCampaignData);
    closeModal();
  };

  const handleChangeValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setNewCampaignData((prevData) => ({
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
              <label htmlFor="title">Título</label>
              <input
                className="w-56 rounded-md border bg-transparent px-2 py-1 placeholder:text-gray-500"
                type="text"
                id="title"
                name="title"
                value={newCampaignData.title}
                onChange={handleChangeValue}
              />
            </div>

            <div className="gap2 flex flex-col">
              <label htmlFor="beginCampaign">Data de Início</label>
              <input
                className="w-56 rounded-md border bg-transparent px-2 py-1 placeholder:text-gray-500"
                type="date"
                id="beginCampaign"
                name="beginCampaign"
                value={newCampaignData.beginCampaign}
                onChange={handleChangeValue}
              />
            </div>

            <div className="gap2 flex flex-col">
              <label htmlFor="endCampaign">Data de Fim</label>
              <input
                className="w-56 rounded-md border bg-transparent px-2 py-1 placeholder:text-gray-500"
                type="date"
                id="endCampaign"
                name="endCampaign"
                value={newCampaignData.endCampaign}
                onChange={handleChangeValue}
              />
            </div>

            <div className="gap2 flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                className="w-56 rounded-md border bg-transparent px-2 py-1"
                id="status"
                name="status"
                value={newCampaignData.status}
                onChange={handleChangeValue}
              >
                <option className="text-black" value="" disabled>
                  Selecione um Status
                </option>
                <option className="text-black" value="ativa">
                  Ativa
                </option>
                {/* <option className="text-black" value="pausada">
                  Pausada
                </option>
                <option className="text-black" value="expirada">
                  Expirada
                </option> */}
              </select>
            </div>

            <div className="gap2 flex flex-col">
              <label htmlFor="category">Categoria</label>
              <select
                className="w-56 rounded-md border bg-transparent px-2 py-1"
                id="category"
                name="category"
                value={newCampaignData.category}
                onChange={handleChangeValue}
              >
                <option disabled className="text-black" value="">
                  Selecione uma categoria
                </option>
                {categories.map((category) => (
                  <option
                    className="text-black"
                    key={category.id}
                    value={category.id}
                  >
                    {category.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5 flex justify-between">
              <button
                type="submit"
                className="w-28 rounded-md border bg-red-400 p-2"
                onChange={closeModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
                onClick={sendForm}
                className="w-28 rounded-md border bg-green-400 p-2"
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
