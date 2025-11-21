import { Download, Edit, FileText, Trash2 } from "lucide-react";
import type { DocumentItem } from "../../types";
import Badge from "../ui/Badge";
import Button from "./Button";

interface DataTableProps {
  data: DocumentItem[];
  onEdit: (doc: DocumentItem) => void;
  onDelete: (doc: DocumentItem) => void;
  onDownload: (doc: DocumentItem) => void;
}

export default function DataTable({
  data,
  onEdit,
  onDelete,
  onDownload,
}: DataTableProps) {
  function formatBytes(bytes: number) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* DESKTOP TABLE */}
      <table className="w-full border-collapse hidden sm:table">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Tag</th>
            <th className="p-3">Upload Date</th>
            <th className="p-3">Size</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((doc) => (
            <tr
              key={doc.id}
              className="border-b border-gray-300 hover:bg-gray-50 transition"
            >
              <td className="p-3">{doc.title}</td>
              <td className="p-3">
                <Badge variant="blue">{doc.tag}</Badge>
              </td>
              <td className="p-3">
                {new Date(doc.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3">{formatBytes(doc.size)}</td>
              <td className="p-3 text-right flex items-center justify-end gap-2">
                <Button onClick={() => onDownload(doc)} variant="ghost">
                  <Download className="w-4 h-4 text-gray-700 hover:text-blue-700" />
                </Button>
                <Button onClick={() => onEdit(doc)} variant="ghost">
                  <Edit className="w-4 h-4 text-gray-700 hover:text-blue-700" />
                </Button>
                <Button onClick={() => onDelete(doc)} variant="ghost">
                  <Trash2 className="w-4 h-4 text-red-600 hover:text-red-800" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MOBILE LISTVIEW */}
      <div className="sm:hidden space-y-3">
        {data.map((doc) => (
          <div
            key={doc.id}
            className="border rounded-lg p-3 shadow-sm border-gray-300"
          >
            {/* Line 1: Name + Tag */}
            <div className="flex justify-between items-center">
              <div className="font-semibold text-gray-900 flex items-center gap-2 text-xl">
                <FileText className="w-4 h-4 text-muted-foreground" />
                {doc.title}
              </div>
              <Badge variant="blue" className="text-sm">
                {doc.tag}
              </Badge>
            </div>

            {/* Line 2: Date + Size */}
            <div className="mt-2 text-md text-gray-600 flex justify-between">
              <span>{new Date(doc.createdAt).toLocaleDateString()}</span>
              <span>{formatBytes(doc.size)}</span>
            </div>

            {/* Line 3: Actions */}
            <div className="mt-3 flex justify-end gap-4">
              <Button onClick={() => onDownload(doc)} variant="outline">
                <Download className="w-5 h-5" />
                Download
              </Button>
              <Button
                onClick={() => onEdit(doc)}
                variant="outline"
                className="text-gray-700 hover:text-blue-700"
              >
                <Edit className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => onDelete(doc)}
                variant="outline"
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
