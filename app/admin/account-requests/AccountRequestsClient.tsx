"use client";
import React, { useState } from "react";
import { AccountRequestActionButton } from "@/components/admin/AccountRequestActionButton";

interface PendingUser {
  id: string;
  fullName: string;
  email: string;
  universityId: number;
}

interface Props {
  pendingUsers: PendingUser[];
}

export default function AccountRequestsClient({ pendingUsers }: Props) {
  const [userList, setUserList] = useState<PendingUser[]>(pendingUsers);

  const handleActionComplete = (userId: string) => {
    setUserList((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-xl font-semibold mb-6">Account Requests</h2>
      <div className="mt-7 w-full overflow-x-auto">
        {userList.length === 0 ? (
          <div className="text-gray-500">No pending account requests.</div>
        ) : (
          <table className="min-w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">University ID</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user: PendingUser) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{user.fullName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.universityId}</td>
                  <td className="py-2 px-4">
                    <AccountRequestActionButton
                      userId={user.id}
                      onActionComplete={() => handleActionComplete(user.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}