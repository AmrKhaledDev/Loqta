function TableCountCell({ value }: { value: number }) {
  return (
    <td>
      <span className="flex items-center justify-center bg-gray-400/30 rounded-sm text-gray-200 font-mono ring ring-gray-300/40 w-8 mx-auto">
        {value}
      </span>
    </td>
  );
}
export default TableCountCell;
