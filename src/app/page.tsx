"use client";

import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { CirclePlus, Maximize2, Pencil, Trash2 } from "lucide-react";
import { ModalAdd } from "@/components/modalAdd/modalAdd";

interface Campaign {
  id: number;
  title: string;
  dataCreation: string;
  beginCampaign: string;
  endCampaign: string;
  status: string;
  category: string;
}
interface Category {
  id: number;
  category: string;
}

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  const requestApi = () => {
    axios
      .get("http://localhost:3000/campaigns")
      .then((response: AxiosResponse<Campaign[]>) => {
        console.log(response.data);
        setCampaigns(response.data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    axios
      .get("http://localhost:3000/categories")
      .then((response: AxiosResponse<Category[]>) => {
        console.log(response.data);
        setCategories(response.data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });
  };

  const deleteCampaign = (id: number) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/campaigns/${id}`)
      .then(() => {
        console.log(`Campanha com id ${id} foi deletada!`);
      })
      .catch((error: unknown) => {
        console.error("Erro ao deletar a campanha", error);
      });
  };

  useEffect(() => {
    requestApi();
  }, []);

  const handleShowModal = (): void => {
    setModalStatus(true);
  };

  const handleCloseModal = (): void => {
    setModalStatus(false);
  };

  const handleAddCampaign = (newCampaign: Campaign) => {
    setCampaigns([...campaigns, newCampaign]);
  };

  return (
    <main>
      {modalStatus && (
        <ModalAdd
          closeModal={handleCloseModal}
          categories={categories}
          addCampaign={handleAddCampaign}
          campaigns={campaigns}
        />
      )}
      <section className="mt-4">
        <button
          onClick={handleShowModal}
          className="ml-auto mr-2 flex items-center gap-2 rounded-sm bg-green-600 px-2"
        >
          Adicionar campanha <CirclePlus size={15} />
        </button>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left">
              <th className="w-max px-4 py-5 text-xs">ID</th>
              <th className="w-max px-4 py-5 text-xs">Titulo</th>
              <th className="w-max px-4 py-5 text-xs">Status</th>
              <th className="w-max px-4 py-5 text-xs">Ações</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr
                key={campaign.id}
                className={`${index % 2 === 0 ? "bg-slate-900" : ""} text-left`}
              >
                <td className="px-4 py-5">{campaign.id}</td>
                <td className="px-4 py-5">{campaign.title}</td>
                <td className="px-4 py-5">{campaign.status}</td>
                <td className="flex items-center gap-2 px-4 py-5">
                  <button className="flex">
                    <Maximize2 size={15} />
                  </button>
                  <button>
                    <Pencil size={15} />
                  </button>
                  <button>
                    <Trash2
                      size={15}
                      color="red"
                      // {const id: number | undefined = campaign.id
                      //   if (id >== 0) {
                      //   }
                      // }
                      onClick={() => deleteCampaign(campaign.id)}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
