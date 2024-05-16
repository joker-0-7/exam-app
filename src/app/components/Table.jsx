import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DeleteIcon, TrashIcon } from "@/app/generate-quiz/IconsSVG";

function TableComponent({ data, page, handleUpdate, handleDelete }) {
  return (
    <div className="border rounded-lg w-full">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              {page === "admin" && (
                <>
                  <TableHead className="w-[100px]">Delete</TableHead>
                  <TableHead className="w-[100px]">Edit</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.map((data, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      {page === "admin"
                        ? data.question
                        : data.questionId.question}
                    </TableCell>
                    {page === "admin" && (
                      <>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="destructive"
                            onClick={() => handleDelete(data._id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleUpdate(data._id)}
                          >
                            <DeleteIcon className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default TableComponent;
