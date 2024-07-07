"use server";

import { driver } from "@/db";
import { Neo4juser } from "@/types";
// To check user in DB
export const getUserById = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (u:User {applicationId : $applicationId}) RETURN u`,
    { applicationId: id }
  );
  const users = result.records.map((record) => {
    record.get("u").properties();
  });
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
