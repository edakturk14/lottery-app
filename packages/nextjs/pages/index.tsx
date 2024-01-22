import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import { parseEther } from "viem";
import { useScaffoldContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {

  const { address } = useAccount();

  const { writeAsync: enter } = useScaffoldContractWrite({
    contractName: "YourContract",
    functionName: "enter",
    value: parseEther("0.0001"),
  });

  const { data: winner } = useScaffoldContractRead({
    contractName: "YourContract",
    functionName: "winner",
    watch: true,
  });
  const showWinner = !winner?.endsWith('00000000');  // Check if winner does not end with '00000000'


  return (
    <>
      <MetaHeader />
      <div className="items-center flex-col flex pt-10">
        <div className="px-5">
          <div className="card w-150 bg-base-100 shadow-xl">
              <div className="card-body p-10">
              <h2 className="card-title">Welcome to the Lottery App!</h2>
                <div className="card-actions justify-center p-3">
                  <button className="btn btn-primary center w-full" onClick={()=>{enter()}}>Enter</button>
                </div>
              </div>
            </div>

            {showWinner && (
              <div className="card w-120 bg-base-100 shadow-xl mt-5">
                <div className="card-body p-10">
                <h2 className="card-title">Winner: {winner}</h2>
                </div>
              </div>
            )}

        </div>
      </div>
    </>
  );
};

export default Home;
