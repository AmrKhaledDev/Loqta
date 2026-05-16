function UserName({ name }: { name: string }) {
  return (
    <td>
      <h2 dir="auto" className="capitalize max-w-40 line-clamp-1">
        {name}
      </h2>
    </td>
  );
}

export default UserName;
