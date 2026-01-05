import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  addRolesExcel,
  addUsersExcel,
  resetRolesUpload,
  resetUsersUpload,
} from "../../../store/reducers/tenantSlice";
import { XlsxIcon } from "../../../assets/svgs";

const UploadExcelForm = ({
  host,
  setOpenForm,
  uploader,
  setdisplayAlert,
  setErrorAlert,
}: any) => {
  const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const validateAndSetFile = (selectedFile: File) => {
    if (
      selectedFile.type !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      selectedFile.type != "application/vnd.ms-excel"
    ) {
      setError("Only .xlsx and .xls files are allowed");
      setFile(null);
      fileInputRef.current && (fileInputRef.current.value = "");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 25 MB");
      setFile(null);
      fileInputRef.current && (fileInputRef.current.value = "");
      return;
    }

    setError(null);
    setFile(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    validateAndSetFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }
    const token = localStorage.getItem("auth_token");
    const formData = new FormData();
    formData.append("file", file);
    if (uploader == "user") {
      await dispatch(
        addUsersExcel({
          payload: formData,
          headers: {
            "x-tenant-id": host,
            "Content-Type": "multipart/form-data",
          },
        })
      )
        .unwrap()
        .then(() => {
          setdisplayAlert(false);
          setOpenForm(false);
          dispatch(resetUsersUpload());
        })
        .catch((err) => {
          const data = err?.response;

          const created = data?.created ?? 0;
          const failed = data?.failed ?? [];
          const total = created + failed.length;

          const errorJsx = (
            <div className="space-y-2">
              <p className="font-medium text-red-600">
                Created {created} out of {total}
              </p>

              {data?.message && (
                <p className="text-gray-700 text-sm">{data.message}</p>
              )}

              {failed.length > 0 && (
                <ul className="pl-5 text-gray-800 text-sm list-disc">
                  {failed.map((f: any, index: number) => (
                    <li key={index}>
                      <span className="font-medium">Row {f.row}:</span>{" "}
                      <span className="text-red-500">{f.error}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          setErrorAlert(errorJsx);
          setdisplayAlert(true);
          dispatch(resetUsersUpload());
          setOpenForm(false);
        });
    } else if (uploader == "role") {
      await dispatch(
        addRolesExcel({
          payload: formData,
          headers: {
            "x-tenant-id": host,
            "Content-Type": "multipart/form-data",
          },
        })
      )
        .unwrap()
        .then(() => {
          setdisplayAlert(false);
          setOpenForm(false);
          dispatch(resetRolesUpload());
        })
        .catch((err) => {
          const data = err?.response;

          const created = data?.created ?? 0;
          const failed = data?.failed ?? [];
          const total = created + failed.length;

          const errorJsx = (
            <div className="space-y-2">
              <p className="font-medium text-red-600">
                Created {created} out of {total}
              </p>

              {data?.message && (
                <p className="text-gray-700 text-sm">{data.message}</p>
              )}

              {failed.length > 0 && (
                <ul className="pl-5 text-gray-800 text-sm list-disc">
                  {failed.map((f: any, index: number) => (
                    <li key={index}>
                      <span className="font-medium">Row {f.row}:</span>{" "}
                      <span className="text-red-500">{f.error}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          setErrorAlert(errorJsx);
          setdisplayAlert(true);
          setOpenForm(false);
          dispatch(resetRolesUpload());
        });
    } else {
      setOpenForm(false);
    }
  };

  return (
    <div className="bg-white shadow-2xl rounded-lg w-full max-w-2xl">
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-semibold text-gray-800 text-xl">Upload file</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-16 transition-all duration-200 ${
              isDragging
                ? "border-green-500 bg-green-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload-input"
            />

            <div className="flex flex-col justify-center items-center text-center">
              <div className="mb-4">
                <XlsxIcon />
              </div>

              <div className="mb-2">
                <span className="text-gray-600 text-sm">
                  Drag&Drop file here or{" "}
                </span>
                <label
                  htmlFor="file-upload-input"
                  className="font-medium text-[#14258f] hover:text-[#14258f] text-sm underline cursor-pointer"
                >
                  Choose file
                </label>
              </div>

              {file && (
                <div className="bg-white mt-4 px-4 py-2 border border-gray-200 rounded text-gray-700 text-sm">
                  Selected: <span className="font-medium">{file.name}</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 mt-4 px-4 py-2 border border-red-200 rounded text-red-600 text-sm">
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 text-gray-500 text-xs">
            <div>Supported formats: .xlsx,.xls </div>
            <div>Maximum size: 25 MB</div>
          </div>

          <button
            type="submit"
            disabled={loading || !file}
            className="items-center gap-2 bg-bsecondary hover:opacity-[0.75] disabled:opacity-50 mt-3 px-7 py-3 border-none rounded-lg w-full h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadExcelForm;
