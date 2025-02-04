import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../store/Redux/pasteSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { CiEdit, CiRead } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCopy, FaRegShareSquare } from "react-icons/fa";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  const handleShare = (paste) => {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => {
          toast.info("Share Your Paste!");
        })
        .catch((error) => {
          toast.error("Error sharing the paste.");
          console.error("Error sharing", error);
        });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="container mx-auto p-5">
      {/* Search input */}
      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-lg w-full max-w-[600px] border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display filtered pastes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="font-bold text-xl mb-2">{paste.title}</div>
              <div className="text-gray-700 mb-4 h-[50px] overflow-hidden">
                {paste.content}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                  <Link
                    to={`/?pasteId=${paste._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <button className="px-2 py-1 border border-blue-500 rounded-md hover:bg-blue-700 hover:text-white hover:cursor-pointer transition duration-300">
                      <CiEdit />
                    </button>
                  </Link>

                  <Link
                    to={`/pastes/${paste._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <button className="px-2 py-1 border border-blue-500 rounded-md hover:bg-blue-700 hover:text-white hover:cursor-pointer transition duration-300">
                      <CiRead />
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="text-red-500 px-2 py-1 border border-red-500 rounded-md hover:bg-red-600 hover:text-white hover:cursor-pointer transition duration-300"
                  >
                    <MdDeleteOutline />
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard!");
                    }}
                    className="text-green-500 hover:text-green-700 px-2 py-1 border border-green-500 rounded-md hover:bg-green-600 hover:text-white hover:cursor-pointer transition duration-300"
                  >
                    <FaRegCopy />
                  </button>

                  <button
                    onClick={() => handleShare(paste)}
                    className="text-yellow-500  px-2 py-1 border border-yellow-500 rounded-md hover:bg-yellow-600 hover:text-white hover:cursor-pointer transition duration-300"
                  >
                    <FaRegShareSquare />
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  {new Date(paste.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No pastes found</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
