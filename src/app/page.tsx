"use client";

import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import {
  CirclePlus,
  Maximize2,
  Pencil,
  Trash2,
  Ban,
  Check,
  Pause,
} from "lucide-react";
import { ModalAdd } from "@/app/components/modalAdd/modalAdd";
import { ModalEdit } from "@/app/components/modalEdit/modalEdit";
import Link from "next/link";

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
  const [modalAddStatus, setModalAddStatus] = useState<boolean>(false);
  const [modalEditStatus, setModalEditStatus] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const requestApi = () => {
    axios
      .get("https://json-server-wb8q.onrender.com/campaigns")
      .then((response: AxiosResponse<Campaign[]>) => {
        console.log(response.data);
        setCampaigns(response.data);
      })
      .catch((error: unknown) => {
        console.error(error);
      });

    axios
      .get("https://json-server-wb8q.onrender.com/categories")
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
      .delete(`https://json-server-wb8q.onrender.com/campaigns/${id}`)
      .then(() => {
        console.log(`Campanha com id ${id} foi deletada!`);
      })
      .catch((error: unknown) => {
        console.error("Erro ao deletar a campanha", error);
      });

    requestApi();
  };

  useEffect(() => {
    requestApi();
  }, []);

  const handleShowModalAdd = (): void => {
    setModalAddStatus(true);
  };
  const handleCloseModalAdd = (): void => {
    setModalAddStatus(false);
  };
  const handleShowModalEdit = (id: number): void => {
    setSelectedId(id);
    setModalEditStatus(true);
  };

  const handleCloseModalEdit = (): void => {
    requestApi();
    setModalEditStatus(false);
  };

  const handleAddCampaign = (newCampaign: Campaign) => {
    setCampaigns([...campaigns, newCampaign]);
  };

  const selectedCampaign = campaigns.find((c) => c.id === selectedId);

  function getStatusIcon(status: string): JSX.Element | null {
    const map: { [key: string]: JSX.Element } = {
      ativa: <Check size={15} />,
      pausada: <Pause size={15} />,
      expirada: <Ban size={15} />,
    };
    return map[status] || null;
  }

  function createSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .trim();
  }

  return (
    <div className="h-screen">
      {modalAddStatus && (
        <ModalAdd
          closeModal={handleCloseModalAdd}
          categories={categories}
          addCampaign={handleAddCampaign}
          campaigns={campaigns}
        />
      )}
      {modalEditStatus && selectedCampaign && (
        <ModalEdit
          closeModal={handleCloseModalEdit}
          categories={categories}
          campaign={selectedCampaign}
        />
      )}
      <section className="mt-10">
        <button
          onClick={handleShowModalAdd}
          className="flex items-center gap-2 rounded-md bg-green px-2"
        >
          Adicionar campanha <CirclePlus size={15} />
        </button>
        <table className="mt-2 w-full border-t-2 border-dark text-xs">
          <thead>
            <tr className="text-left">
              <th className="w-max px-1 py-5 text-xs">ID</th>
              <th className="w-max px-1 py-5 text-xs">Titulo</th>
              <th className="w-max px-1 py-5 text-xs">Status</th>
              <th className="w-max px-4 py-5 text-xs"></th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr
                key={campaign.id}
                className={`${index % 2 === 0 ? "bg-dark" : ""} text-left`}
              >
                <td className="px-1 py-5">{campaign.id}</td>
                <td className="px-1 py-5">{campaign.title}</td>
                <td className="px-1 py-5">
                  <div className="flex gap-2">
                    {campaign.status.charAt(0).toUpperCase() +
                      campaign.status.slice(1)}
                    {getStatusIcon(campaign.status)}
                  </div>
                </td>
                <td className="flex items-center gap-5 px-1 py-5">
                  <Link
                    href={`/details/${createSlug(campaign.title)}-${campaign.id}`}
                    passHref
                  >
                    <button>
                      <Maximize2 size={15} />
                    </button>
                  </Link>
                  <button onClick={() => handleShowModalEdit(campaign.id)}>
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => deleteCampaign(campaign.id)}>
                    <Trash2 size={15} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
