import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(paste.content)
      .then(() => {
        toast.success("Content copied to clipboard!");
      })
      .catch((error) => {
        toast.error("Failed to copy content.");
        console.error("Error copying content", error);
      });
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className="container w-full max-w-3xl p-5">
        {/* Title Section */}
        <div className="flex gap-5 place-content-between mb-4">
          <input
            type="text"
            value={paste.title}
            placeholder="Enter title here"
            className="p-3 pl-5 pr-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            disabled
          />
        </div>

        {/* Content Section */}
        <div className="mt-4">
          <textarea
            value={paste.content}
            placeholder="Enter content here"
            className="border-2 border-gray-300 rounded-2xl mt-4 w-full p-4 text-gray-700"
            rows={14}
            disabled
          ></textarea>
        </div>

        {/* Copy Button */}
        <div className="flex justify-center mt-6 lg:absolute lg:top-[37%] lg:right-[15%]">
          <button
            onClick={handleCopy}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
            aria-label="Copy content to clipboard"
          >
            <FaRegCopy />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
