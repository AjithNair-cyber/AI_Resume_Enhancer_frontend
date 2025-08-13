"use client";

import { useEffect, useState } from "react";
import { getResumes } from "@/functions/apiFunctions";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import Loader from "@/components/Loader";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResumeTemplate from "@/components/ResumeTemplate";
import { Button } from "flowbite-react";
import { toast } from "react-toastify";

const columnHelper = createColumnHelper<ResumeData>();

export default function ResumePage() {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const response = await getResumes();
      setLoading(false);
      setResumes(response);
    };
    try {
      getData();
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch resumes");
      console.error("Error fetching resumes:", error);
    }
  }, []);

  const columns = [
    columnHelper.display({
      id: "serial",
      header: "S.No",
      cell: (info) => info.row.index + 1, // index starts from 0
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("job_role", {
      header: "Job Role",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("created_at", {
      header: "Created Time",
      cell: (info) => {
        const date = new Date(info.getValue() as string);
        if (date.toLocaleDateString() === "Invalid Date") {
          return "N/A"; // Handle invalid date
        }
        return date.toLocaleDateString("en-GB"); // Shows only date
      },
    }),
    columnHelper.display({
      id: "actions",
      header: "Download",
      cell: (info) => (
        <div className="flex gap-2">
          <PDFDownloadLink
            document={<ResumeTemplate {...info.row.original} />}
            fileName={`Resume ${info.row.original.name}_${info.row.original.job_role}.pdf`}
          >
            <Button color="green">Download</Button>
          </PDFDownloadLink>
        </div>
      ),
    }),
  ];

  const table = useReactTable<ResumeData>({
    data: resumes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  console.log(loading);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-x-auto w-full max-w-full">
      <h1 className="text-3xl pb-8 font-semibold">My Resumes</h1>
      {resumes.length === 0 ? (
        <div className="text-center text-gray-500">
          No resumes saved. Please upload and save a resume.
        </div>
      ) : (
        <table className="border bg-white dark:bg-slate-800 w-7/8 rounded-md overflow-hidden shadow-md">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border bg-white dark:bg-slate-900 border-gray-300 px-4 py-2 text-left"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, index) => (
              <tr key={index} className="">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border border-gray-300 px-4 py-2"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
