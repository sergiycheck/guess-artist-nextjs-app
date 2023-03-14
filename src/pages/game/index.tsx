import { SharedHead } from "@/components/head";
import dynamic from "next/dynamic";

const DynamicGame = dynamic(() => import("../../components/game/game"), {
  ssr: false,
});

export default function GameContainer() {
  return (
    <>
      <SharedHead />
      <DynamicGame />
    </>
  );
}
