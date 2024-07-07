"use client";
import { Neo4juser } from "@/types";
import * as React from "react";

interface HomePageClientProps {
  currentUser: Neo4juser;
  users: Neo4juser[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({
  currentUser,
  users,
}) => {
  return <></>;
};

export default HomePageClient;
