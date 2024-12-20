import React from "react";
import db from "@/lib/db";
import { auth } from "@/auth";
import HomeContent from "../_components/homeContent";

export default async function Home() {
  const session = await auth();

  const notebooks = await db.notebookModel.findMany({
    where: {
      userId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <HomeContent notebooks={notebooks} />;
}
