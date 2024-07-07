"use client";
import { Neo4juser } from "@/types";
import * as React from "react";
import TinderCard from "react-tinder-card";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { neo4jswipe } from "@/app/neo4j.action";

interface HomePageClientProps {
  currentUser: Neo4juser;
  users: Neo4juser[];
}

const HomePageClient: React.FC<HomePageClientProps> = ({
  currentUser,
  users,
}) => {
  const handleSwipe = async (direction: string, userId: string) => {
    const isMatch = await neo4jswipe(
      currentUser.applicationId,
      direction,
      userId
    );
    if (isMatch) {
      alert("Matched!!!");
    }
  };
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center mb-4">
        <div>
          <h1 className="text-4xl ">Hello, {currentUser.firstname}</h1>
        </div>
        <div className="relative">
          {users.map((user) => (
            <TinderCard
              className="absolute"
              onSwipe={(direction) =>
                handleSwipe(direction, user.applicationId)
              }
              key={user.applicationId}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{user.firstname}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
              </Card>
            </TinderCard>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePageClient;
