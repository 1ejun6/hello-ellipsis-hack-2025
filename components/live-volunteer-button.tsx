"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LiveVolunteerButton() {
  const router = useRouter();

  const liveVolunteer = () => {
    router.push("/protected/live-volunteer");
  };

  return <Button onClick={liveVolunteer}>Live Volunteer</Button>;
}
