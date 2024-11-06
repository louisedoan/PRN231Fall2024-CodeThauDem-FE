import { Spotlight } from "../components/ui/Spotlights";
import { FloatingDock } from "../components/ui/FloatingDock";
import React from "react";
import {
  IconBadgeAdFilled,
  IconCreditCard,
  IconPlane,
  IconMapPins,
  IconUsers,
  IconReport
} from "@tabler/icons-react"

const AdminPage = () => {
  const links = [
    {
      title: "Manage User",
      icon: <IconUsers className="h-full w-full text-neutral-300" />,
      href: "/manage-users",
    },

    {
      title: "Manage Flight Route",
      icon: <IconMapPins className="h-full w-full text-neutral-300" />,
      href: "/flight-route",
    },
    {
      title: "Manage Flight",
      icon: <IconPlane className="h-full w-full text-neutral-300" />,
      href: "/manage-flight",
    },
    {
      title: "Manage Report",
      icon: <IconReport className="h-full w-full text-neutral-300" />,
      href: "/flight-report",
    },
  ];
  return (
    <div className="flex flex-1">
      <div className="bg-grid-white/[0.02] relative flex h-screen w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="white"
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
          <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
            Administartor Dashboard<br /> 
          </h1>
          <div className="flex h-[35rem] w-full items-center justify-center">
            <FloatingDock mobileClassName="translate-y-20" items={links} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
