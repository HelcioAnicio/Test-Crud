import { Minus } from "lucide-react";

interface ModalAddProps {
  closeModal: () => void;
}

export const ModalAdd = ({ closeModal }: ModalAddProps) => {
  return (
    <>
      <div className="absolute bottom-0 z-20 flex h-full w-full flex-col bg-black bg-opacity-85">
        <div className="absolute bottom-0 flex h-5/6 w-full flex-col rounded-t-3xl bg-gray-800">
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
              />
            </div>
            <div className="gap2 flex flex-col">
              <label htmlFor="beginCampaign">Data de Início</label>
              <input
                className="w-56 rounded-md border bg-transparent px-2 py-1 placeholder:text-gray-500"
                type="date"
                id="beginCampaign"
                name="beginCampaign"
              />
            </div>
            <div className="gap2 flex flex-col">
              <label htmlFor="endCampaign">Data de Fim</label>
              <input
                className="w-56 rounded-md border bg-transparent px-2 py-1 placeholder:text-gray-500"
                type="date"
                id="endCampaign"
                name="endCampaign"
              />
            </div>
            <div className="gap2 flex flex-col">
              <label htmlFor="status">Status</label>
              <select
                className="w-56 rounded-md border bg-transparent px-2 py-1"
                id="status"
                name="status"
              >
                <option value="ativa">Ativa</option>
                <option value="pausada">Pausada</option>
                <option value="expirada">Expirada</option>
              </select>
            </div>
            <div className="gap2 flex flex-col">
              <label htmlFor="categoria">Categoria</label>
              <select
                className="w-56 rounded-md border bg-transparent px-2 py-1"
                id="categoria"
                name="categoria"
              >
                <option value="">Selecione uma categoria</option>
                <option value="categoria1">Categoria 1</option>
                <option value="categoria2">Categoria 2</option>
                <option value="categoria3">Categoria 3</option>
              </select>
            </div>
            <div className="mt-auto flex justify-between">
              <button
                type="submit"
                className="w-28 rounded-md border bg-red-400 p-2"
                onChange={closeModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
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
