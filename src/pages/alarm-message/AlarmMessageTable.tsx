import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

type TableRow = {
  code: string;
  korean: string;
  english: string;
};

type Props = {
  rows: TableRow[];
};

export default function AlarmMessageTable({ rows }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Level</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Korean</TableHead>
          <TableHead>English</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => {
          const [level, alarmCode] = row.code.split("_").slice(-2);

          return (
            <TableRow key={row.code}>
              <TableCell>{level}</TableCell>
              <TableCell>{alarmCode}</TableCell>
              <TableCell>{row.korean}</TableCell>
              <TableCell>{row.english}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
