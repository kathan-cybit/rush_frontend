import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import {
  addRolesExcel,
  addUsersExcel,
  resetRolesUpload,
  resetUsersUpload,
} from "../../../store/reducers/tenantSlice";

const UploadExcelForm = ({
  host,
  setOpenForm,
  uploader,
  setdisplayAlert,
  setErrorAlert,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (
      selectedFile.type !=
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setError("Only .xlsx files are allowed");
      setFile(null);
      e.target.value = "";
      return;
    }

    setError(null);
    setFile(selectedFile);
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
    <div className="bg-white mx-auto p-6 rounded-lg max-w-md">
      <h2 className="mb-4 font-semibold text-lg">Upload Excel File</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            className="block hover:file:bg-blue-100 file:bg-blue-50 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-md w-full file:font-medium text-gray-600 file:text-blue-700 text-sm file:text-sm"
          />
        </div>
        <span className="font-fsecondary text-[#adadad] text-[13px] text-[500] leading-[140%]">
          upload .xlsx file
        </span>
        {file && (
          <p className="text-gray-600 text-sm">
            Selected: <strong>{file.name}</strong>
          </p>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="items-center gap-2 bg-bsecondary hover:opacity-[0.75] px-7 py-3 border-none rounded-lg w-full h-[45px] font-medium text-white text-sm transition-all duration-200 cursor-pointer"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadExcelForm;
