"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronsLeft } from "lucide-react";

interface CampaignDetails {
  id: number;
  title: string;
  dataCreation: string;
  beginCampaign: string;
  endCampaign: string;
  status: string;
  category: string;
}

export default function Details({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [campaignDetails, setCampaignDetails] =
    useState<CampaignDetails | null>(null);

  const id = slug ? slug.split("-").pop() : null;

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/campaigns/${id}`)
        .then((response) => {
          setCampaignDetails(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar os detalhes da campanha", error);
        });
    }
  }, [id]);

  if (!campaignDetails) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col gap-10 p-6 pb-12">
      <div>
        <button
          onClick={() => window.history.back()}
          className="flex gap-2 border-b-2 py-1 pl-1 pr-4"
        >
          <ChevronsLeft size={25} />
          Voltar
        </button>
      </div>

      <h1 className="text-xl font-bold">Detalhes da Campanha</h1>

      <div className="grid grid-cols-2 gap-x-1 gap-y-5 sm:grid-cols-2">
        <div>
          <p className="flex flex-col">
            <strong className="text-gray-400">ID:</strong> {campaignDetails.id}
          </p>
        </div>
        <div>
          <p className="flex flex-col">
            <strong className="text-gray-400">Título:</strong>{" "}
            {campaignDetails.title}
          </p>
        </div>
        <div>
          <p className="flex flex-col">
            <strong className="text-gray-400">Data de Criação:</strong>{" "}
            {campaignDetails.dataCreation}
          </p>
        </div>
        <div>
          <p className="flex flex-col">
            <strong className="text-gray-400">Início da Campanha:</strong>{" "}
            {campaignDetails.beginCampaign}
          </p>
        </div>
        <div>
          <p className="flex flex-col">
            <strong className="text-gray-400">Fim da Campanha:</strong>{" "}
            {campaignDetails.endCampaign}
          </p>
        </div>
        <div>
          <p className="flex flex-col">
            <strong className="text-gray-400">Status:</strong>{" "}
            {campaignDetails.status}
          </p>
        </div>
        <div>
          <p className="flex flex-col">
            <strong className="text-gray-400">Categoria:</strong>{" "}
            {campaignDetails.category}
          </p>
        </div>
      </div>
    </div>
  );
}
