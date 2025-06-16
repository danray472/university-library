import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import AccountRequestsClient from "./AccountRequestsClient";

export default async function AccountRequestsPage() {
  const pendingUsers = await db.select().from(users).where(eq(users.status, "PENDING"));
  return <AccountRequestsClient pendingUsers={pendingUsers} />;
} 