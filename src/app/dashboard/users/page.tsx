import { getUsers } from "@/lib/Db/getUsers";
import UsersPageContent from "./_components/UsersPageContent";
// ==============================================================
async function Users() {
  const users = await getUsers();
  return (
    <main className="flex flex-col gap-10">
      <UsersPageContent users={users} />
    </main>
  );
}

export default Users;
