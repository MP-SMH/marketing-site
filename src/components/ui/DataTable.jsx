import { useMemo, useState } from 'react';
import Pagination from './Pagination';

// DataTable - sortable, paginated table.
export default function DataTable({ columns = [], rows = [], pageSize = 8 }) {
  const [sortKey, setSortKey] = useState(columns[0]?.key);
  const [direction, setDirection] = useState('asc');
  const [page, setPage] = useState(1);
  const sorted = useMemo(() => [...rows].sort((a, b) => {
    const av = a[sortKey] ?? '';
    const bv = b[sortKey] ?? '';
    return direction === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  }), [rows, sortKey, direction]);
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize);
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const toggleSort = (key) => { setDirection(sortKey === key && direction === 'asc' ? 'desc' : 'asc'); setSortKey(key); };
  return (
    <div>
      <table className="mkt-table">
        <thead><tr>{columns.map((col) => <th key={col.key} onClick={() => toggleSort(col.key)} scope="col">{col.label}</th>)}</tr></thead>
        <tbody>{pageRows.map((row, i) => <tr key={row.id || i}>{columns.map((col) => <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>)}</tr>)}</tbody>
      </table>
      <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
    </div>
  );
}
