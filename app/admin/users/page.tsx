import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { MakeAdminButton } from "@/components/admin/MakeAdminButton";

export default async function AdminUsersPage() {
  const allUsers = await db.select().from(users);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      {allUsers.length === 0 ? (
        <div className="text-gray-500">No users found.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Email</th>
                <th className="py-3 px-4 font-semibold">University ID</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Last Activity</th>
                <th className="py-3 px-4 font-semibold">Created At</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{user.fullName}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.universityId}</td>
                  <td className={`py-2 px-4 capitalize ${user.status === "PENDING" ? "text-red-600 font-bold" : ""}`}>{user.status}</td>
                  <td className={`py-2 px-4 capitalize ${user.role === "ADMIN" ? "text-green-600 font-bold" : ""}`}>{user.role}</td>
                  <td className="py-2 px-4">{user.lastActivityDate ? new Date(user.lastActivityDate).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-4">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</td>
                  <td className="py-2 px-4">
                    {user.role !== "ADMIN" && (
                      <MakeAdminButton userId={user.id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
