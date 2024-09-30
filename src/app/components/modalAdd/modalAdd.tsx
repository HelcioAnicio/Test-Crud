import axios from "axios";
import { Minus } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ModalAddProps {
  closeModal: () => void;
  categories: { id: number; category: string }[];
  addCampaign: (newCampaignData: Campaign) => void;
  campaigns: Campaign[];
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

export const ModalAdd = ({
  closeModal,
  categories,
  addCampaign,
  campaigns,
}: ModalAddProps) => {
  const getNextId = (): number => {
    const maxId = campaigns.reduce(
      (max, campaign) => (campaign.id > max ? campaign.id : max),
      0,
    );
    return Number(maxId) + 1;
  };

  const [newCampaignData, setNewCampaignData] = useState<Campaign>({
    id: getNextId(),
    title: "",
    dataCreation: new Date().toISOString().split("T")[0],
    beginCampaign: "",
    endCampaign: "",
    status: "",
    category: "",
  });

  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const validateDates = (): boolean => {
    const today = new Date().toISOString().split("T")[0];
    const beginDate = newCampaignData.beginCampaign;
    const endDate = newCampaignData.endCampaign;

    if (!beginDate || !endDate) {
      setValidationMessage("Datas de início e fim são obrigatórias.");
      return false;
    }

    if (beginDate < today) {
      setValidationMessage(
        "A data de início não pode ser anterior à data atual.",
      );
      return false;
    }

    if (endDate < today) {
      setNewCampaignData((prevData) => ({
        ...prevData,
        status: "expirada",
      }));
    } else if (beginDate <= today && endDate >= today) {
      setNewCampaignData((prevData) => ({
        ...prevData,
        status: "ativa",
      }));
    } else if (beginDate > today) {
      setNewCampaignData((prevData) => ({
        ...prevData,
        status: "pausada",
      }));
    }

    setValidationMessage(null);
    return true;
  };

  useEffect(() => {
    if (newCampaignData.beginCampaign && newCampaignData.endCampaign) {
      validateDates();
    }
  }, [newCampaignData.beginCampaign, newCampaignData.endCampaign]);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    if (!validateDates()) return;

    axios
      .post("https://json-server-wb8q.onrender.com/campaigns", {
        ...newCampaignData,
        id: String(getNextId()),
        dataCreation: new Date().toISOString().split("T")[0],
      })
      .then((response) => {
        console.log(response);
        addCampaign(newCampaignData);
        closeModal();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setNewCampaignData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
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
          className="flex h-full flex-col gap-5 px-4 pb-8"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label className="text-gray-400" htmlFor="title">
              Título:
            </label>
            <input
              className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
              type="text"
              id="title"
              name="title"
              value={newCampaignData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400" htmlFor="beginCampaign">
              Data de Início:
            </label>
            <input
              className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
              type="date"
              id="beginCampaign"
              name="beginCampaign"
              value={newCampaignData.beginCampaign}
              onChange={handleInputChange}
              required
            />
          </div>
          {validationMessage && (
            <div className="-mt-3 text-xs text-red-500">
              {validationMessage}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label className="text-gray-400" htmlFor="endCampaign">
              Data de Fim:
            </label>
            <input
              className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
              type="date"
              id="endCampaign"
              name="endCampaign"
              value={newCampaignData.endCampaign}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400" htmlFor="status">
              Status:
            </label>
            <input
              className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
              type="text"
              id="status"
              name="status"
              value={newCampaignData.status}
              disabled
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400" htmlFor="category">
              Categoria:
            </label>
            <select
              className="w-56 border-b-2 bg-transparent px-2 py-1 text-sm outline-none"
              id="category"
              name="category"
              value={newCampaignData.category}
              onChange={handleInputChange}
              required
            >
              <option disabled value="">
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
              type="button"
              className="w-28 rounded-md border bg-wrong p-2"
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-28 rounded-md border bg-green p-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
