import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define validation schema
const todoSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(0),
  deadline: z.string(),
});

type TodoFormData = z.infer<typeof todoSchema>;

export const Form = ({
  addTodo,
}: {
  addTodo: (todo: {
    title: string;
    description: string;
    deadline: string;
  }) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = (data: TodoFormData) => {
    addTodo(data);
    reset();
    setIsOpen(false); // Close modal after submitting
  };

  return (
    <>
      {/* Button to Open Modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        ➕ Add ToDo
      </button>

      {/* Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
              <Dialog.Title className="text-lg font-bold">
                New ToDo
              </Dialog.Title>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                <div>
                  <input
                    {...register("title")}
                    placeholder="Title"
                    className="w-full p-2 border rounded"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register("description")}
                    placeholder="Description"
                    className="w-full p-2 border rounded"
                  />
                </div>

                <div>
                  <input
                    {...register("deadline")}
                    type="datetime-local"
                    className="w-full p-2 border rounded"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  {errors.deadline && (
                    <p className="text-red-500 text-sm">
                      {errors.deadline.message}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add ToDo
                  </button>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
