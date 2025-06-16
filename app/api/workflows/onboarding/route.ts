import { serve } from "@upstash/workflow/nextjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow";

type UserState = "non-active" | "active";

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (
    timeDifference > THREE_DAYS_IN_MS &&
    timeDifference <= THIRTY_DAYS_IN_MS
  ) {
    return "non-active";
  }

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Welcome Email
  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to Bazu Library! Your Reading Adventure Begins!",
      message: `Welcome aboard, ${fullName}!

Your journey with Bazu Library officially begins now. Dive into our vast collection of books, explore new genres, and discover your next great read. We're thrilled to have you!

Ready to get started? Log in and browse our latest arrivals: [Your Library URL]

Happy Reading!
The Bazu Library Team`,
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "Don't Miss Out! New Adventures Await at Bazu Library",
          message: `Hey ${fullName},

It's been a little while since we last saw you at Bazu Library! Our shelves are constantly updating with exciting new titles and hidden gems.

Come back and rediscover the joy of reading. Perhaps there's a new bestseller or a forgotten classic waiting for you. Log in today: [Your Library URL]

We miss you and happy reading!
The Bazu Library Team`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome Back to Bazu Library!",
          message: `Welcome back, ${fullName}!

It's great to see you active in Bazu Library again! We hope you're finding fantastic reads and making the most of your membership. Keep exploring our diverse collection.

Catch up on the latest additions or pick up where you left off: [Your Library URL]

Happy Reading!
The Bazu Library Team`,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
