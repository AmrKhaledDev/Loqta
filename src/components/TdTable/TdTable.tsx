function TdTable({ children }: { children: React.ReactNode }) {
  return <td className="whitespace-nowrap lg:p-3 sm:p-2 p-1">{children}</td>;
}

export default TdTable;
