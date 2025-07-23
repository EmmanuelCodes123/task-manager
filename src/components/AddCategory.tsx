import { useUserContext } from "../hooks/useUserContext";

export default function AddCategory({ title, closeModal }: { title: string, closeModal: () => void }) {
  const { setPriority, setStatus } = useUserContext();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const categoryTitle = formData.get("title") as string;
    if (title === "Task Status") {
      setStatus((prev) => [...prev, categoryTitle]);
    } else if (title === "Task Priority") {
      setPriority((prev) => [...prev, categoryTitle]);
    }
    closeModal();
    event.currentTarget.reset();
    console.log(formData, categoryTitle);
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-black/50 flex items-center justify-center z-300">
      <div className="bg-white lg:w-170 w-full lg:h-130 h-screen rounded-2xl lg:p-10 p-2 flex flex-col">
        <header className="shrink-0 flex justify-between mb-4">
          <h2>Add {title}</h2>
          <h2 onClick={() => closeModal()}>Go Back</h2>
        </header>
        <form
          onSubmit={handleSubmit}
          className="border-2 rounded border-gray-400 p-2 flex flex-col flex-grow overflow-auto"
        >
          <label htmlFor="title" className="mb-2">
            {title} Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-2 border-gray-300 rounded w-100 mb-5"
            required
          />
          <button
            type="submit"
            className="py-1 px-6 w-fit rounded flex gap-2 bg-red-400 text-white"
          >
            Create
          </button>
        </form>
      </div>

    </div>
  );
}
