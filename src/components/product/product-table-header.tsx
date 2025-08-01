import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SortButton } from "../shared/sort-button";

interface ProductTableHeaderProps {
  onSort: (newOrder: string, newSort: string) => void;
  order: string;
  sortBy: string;
}
export const ProductTableHeader: React.FC<ProductTableHeaderProps> = ({
  onSort,
  sortBy,
  order,
}) => {
  return (
    <TableHeader>
      <TableRow className=" hover:bg-transparent">
        <TableHead className="w-1/2">
          <SortButton
            checked={sortBy === "title"}
            order={order}
            text="Tên sản phẩm"
            onClick={(newOrder) => onSort(newOrder, "title")}
          />
        </TableHead>
        <TableHead>Danh mục</TableHead>
        <TableHead>Trạng thái</TableHead>
        <TableHead>
          <SortButton
            checked={sortBy === "price"}
            order={order}
            text="Giá bán"
            onClick={(newOrder) => onSort(newOrder, "price")}
          />
        </TableHead>
        <TableHead>
          <span className="sr-only">Thao tác</span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
