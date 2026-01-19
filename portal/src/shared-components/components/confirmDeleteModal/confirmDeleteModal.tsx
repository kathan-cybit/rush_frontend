import React from "react";
import { Modal } from "../../ui";

export default function ConfirmDeleteModal({
  ConfirmDelete,
  modalClose,
  host,
  tenantType,
  deleteEntry,
}) {
  return (
    <div>
      <Modal
        opened={ConfirmDelete?.mode}
        onClose={() => {
          modalClose();
        }}
        centered
        withCloseButton={false}
        size="sm"
      >
        <div className="px-2 py-1">
          <h2 className="mb-2 font-semibold text-gray-800 text-lg">
            Confirm Deletion
          </h2>

          <p className="mb-6 text-gray-600 text-sm leading-relaxed">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              className="bg-white hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm transition"
              onClick={() => {
                modalClose(ConfirmDelete?.row, host, tenantType);
              }}
            >
              Cancel
            </button>

            <button
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium text-white text-sm transition"
              onClick={() => {
                deleteEntry(ConfirmDelete?.row, host, tenantType);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
