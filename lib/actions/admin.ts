import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function updateUserRole(userId: string, newRole: "USER" | "ADMIN") {
  await db.update(users)
    .set({ role: newRole })
    .where(eq(users.id, userId));
} 