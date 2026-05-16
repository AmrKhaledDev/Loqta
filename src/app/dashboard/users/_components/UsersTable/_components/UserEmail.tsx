// ==================================================
function UserEmail({ email }: { email: string }) {
  return (
    <td>
      <p
        dir="auto"
        className="font-normal font-mono text-sm text-gray-300 max-w-35 line-clamp-1"
      >
        {email}
      </p>
    </td>
  );
}

export default UserEmail;
