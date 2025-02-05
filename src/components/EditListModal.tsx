import { useEffect, useState } from "react";

interface EditListModalProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  onSave: (newTitle: string) => void;
}

const EditListModal = ({
  isOpen,
  onClose,
  onSave,
  listName,
}: EditListModalProps) => {
  const [name, setName] = useState(listName);

  useEffect(() => {
    setName(listName);
  }, [isOpen, listName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center shadow-2xl bg-opacity-30 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit List</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded-md"
          disabled={false}
        />
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(name);
              onClose();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditListModal;
