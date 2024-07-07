"use server";

import { driver } from "@/db";

export const getUserById = async (id: string) => {
  const result = await driver.executeQuery(
    `MATCH (u:User {applicationId : $applicationId}) RETURN u`,
    { applicationId: id }
  );
  const user = result.records.map((record) => {
    record.get("u").properties();
  });
  return user;
};
