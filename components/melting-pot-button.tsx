"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function MeltingPotButton() {
  const router = useRouter();

  const meltingPot = () => {
    router.push("/protected/melting-pot");
  };

  return <Button onClick={meltingPot}>Melting Pot</Button>;
}
