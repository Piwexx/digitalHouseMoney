import { Account } from "@/types/account";
import IconCopy from "./profile/IconCopy";

interface props {
  accoutInfo: Account
}

export default function AccountInfo({accoutInfo}:props) {

  return (
    <div className="min-h-[264px] bg-secondary-color text-white rounded-lg p-8 mt-4 flex flex-col justify-between">
      <div className="text-xl font-bold space-x-3 mb-4">
        <p>Copia tu cvu o alias para ingresar o transferir dinero desde otra cuenta</p>
      </div>
      <div className="mt-4 flex flex-row justify-between items-center">
        <div>
          <p className="text-lg font-bold text-primary-color">CVU</p>
          <p className="text-lg">{accoutInfo.cvu}</p>
        </div>
        <IconCopy copy={accoutInfo.cvu}/>
      </div>
      <div className="mt-4 flex flex-row justify-between items-center">
        <div>
          <p className="text-lg font-bold text-primary-color">Alias</p>
          <p className="text-lg">{accoutInfo.alias}</p>
        </div>
        <IconCopy copy={accoutInfo.alias}/>
      </div>
    </div>
  );
}