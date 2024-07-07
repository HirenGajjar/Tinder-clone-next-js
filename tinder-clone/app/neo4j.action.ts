"use server";

import { driver } from "@/db";
import { Neo4juser } from "@/types";
// To check user in DB
export const getUserById = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (u:User {applicationId : $applicationId}) RETURN u`,
    { applicationId: id }
  );
  const users = result.records.map((record) => record.get("u").properties);
  if (users.length === 0) {
    return null;
  }
  return users[0] as Neo4juser;
};

// To create user in DB

export const createUser = async (user: Neo4juser) => {
  const { email, applicationId, firstname, lastname } = user;
  driver.executeQuery(
    `CREATE (u:User {applicationId :$applicationId,email :$email, firstname:$firstname, lastname:$lastname})`,
    { applicationId, email, firstname, lastname }
  );
};

// This controller will hide the cards which are either left or right swapped

export const alreadySwipped = async (id: string) => {
  // This query fist fetches the current user, then matches the other user where non of the user had liked or disliked each other, also check both users are not same
  // We only build link between two users if both had liked each others

  const result = await driver.executeQuery(
    `MATCH (cu: User {applicationId :$applicationId}) MATCH (ou:User) WHERE NOT (cu)-[:LIKE | : DISLIKE]->(ou) AND cu <> ou RETURN ou`,
    { applicationId: id }
  );
  // result variable is an array and we use map function to get each record and return it
  const users = result.records.map((record) => record.get("ou").properties);
  return users as Neo4juser[];
};

// This function checks if the swipe was left or right, and with respect to that it will make link for like or dislike
export const neo4jswipe = async (id: string, swipe: string, userId: string) => {
  const directionOfSwipe = swipe === "left" ? "DISLIKE" : "LIKE";
  await driver.executeQuery(
    `MATCH (cu: User {applicationId :$id}),(ou:User {applicationId : $userId }) CREATE (cu)-[:${directionOfSwipe}]->
  (ou)`,
    {
      id,
      userId,
    }
  );
  // In case of other user already liked current logged in user, and current user likes the other user too, that makes a match
  // Following query will check the match
  if (directionOfSwipe === "LIKE") {
    const result = await driver.executeQuery(
      `MATCH (cu:User {applicationId :$id }),(ou:User {applicationId : $userId}) WHERE (ou)-[:LIKE] -> (cu) RETURN ou as  match`,
      { id, userId }
    );
    const matches = result.records.map(
      (record) => record.get("match").properties
    );
    return Boolean(matches.length > 0);
  }
};

export const getMatches = async (currnetUserId: string) => {
  const result = await driver.executeQuery(
    `MATCH (cu:User {applicationId :$id}) -[:LIKE]-(ou: User)-[:LIKE] -> (cu) RETURN ou as match`,
    { id: currnetUserId }
  );
  const matches = result.records.map(
    (record) => record.get("match").properties
  );
  return matches as Neo4juser[];
};
