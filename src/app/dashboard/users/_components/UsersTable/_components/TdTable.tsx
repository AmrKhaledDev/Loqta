function TdTable({ children }: { children: React.ReactNode }) {
  return <td className="whitespace-nowrap p-3">{children}</td>;
}

export default TdTable;
