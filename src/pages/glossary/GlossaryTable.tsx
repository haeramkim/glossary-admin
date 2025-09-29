import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabaseClient";
import EditWordModal from "@/modals/EditWordModal";
import InsertWordModal from "@/modals/InsertWordModal";
import { useState } from "react";

type TableRow = {
  id: number;
  word: string;
  created_at: string;
};

type Props = {
  rows: TableRow[];
  onUpdate: () => void;
};

export default function GlossaryTable({ rows, onUpdate }: Props) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TableRow | null>(null);

  const handleDelete = async () => {
    const { error } = await supabase
      .from("glossary")
      .delete()
      .in("id", selectedItems);

    if (error) {
      console.error("Error deleting items:", error);
    } else {
      setSelectedItems([]);
      onUpdate();
    }
    console.log("delete");
  };

  const handleEdit = (checkedId: number) => {
    const targetItem = rows.filter((item) => item.id === checkedId)[0];

    setEditingItem(targetItem);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          onClick={() => {
            setSelectedItems([]);
            setIsInsertModalOpen(true);
          }}
        >
          Insert Row
        </Button>
        <Button
          onClick={() => handleEdit(selectedItems[0])}
          disabled={selectedItems.length !== 1}
        >
          Edit
        </Button>
        <Button onClick={handleDelete} disabled={selectedItems.length === 0}>
          Delete
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Word</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={selectedItems.includes(row.id)}
                  onCheckedChange={(checked) => {
                    setSelectedItems(
                      checked
                        ? [...selectedItems, row.id]
                        : selectedItems.filter((id) => id !== row.id)
                    );
                  }}
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.word}</TableCell>
              <TableCell>
                {new Date(row.created_at).toLocaleString("ko-KR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <InsertWordModal
        isOpen={isInsertModalOpen}
        onClose={() => setIsInsertModalOpen(false)}
        onInsert={onUpdate}
      />

      <EditWordModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={onUpdate}
        item={editingItem}
      />
    </div>
  );
}
