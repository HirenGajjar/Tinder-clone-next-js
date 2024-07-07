"use client";
import { Neo4juser } from "@/types";
import * as React from "react";
import TinderCard from "react-tinder-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface HomePageClientProps {
  currentUser: Neo4juser;
  users: Neo4juser[];
}

const handleSwipe = (direction: string, userId: string) => {};

const HomePageClient: React.FC<HomePageClientProps> = ({
  currentUser,
  users,
}) => {
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
