import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToPastes, updateToPastes } from "../store/Redux/pasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  const pasteId = searchParams.get("pasteId");

  const createPaste = () => {
    if (!title || !value) {
      alert("Title and Content cannot be empty!");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  return (
    <div className="container mx-auto p-5">
      <div className="flex flex-col md:flex-row gap-7 justify-between">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title here"
          className="p-3 pl-5 px-2 rounded-md mt-2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-2/3"
        />
        <button
          onClick={createPaste}
          className="p-2 px-4 mt-2 bg-blue-500 text-white rounded-md w-full md:w-auto"
          aria-label={pasteId ? "Update Paste" : "Create My Paste"}
        >
          {pasteId ? "Update Paste" : "Create My Paste"}
        </button>
      </div>
      <div className="mt-6">
        <textarea
          value={value}
          placeholder="Enter content here"
          onChange={(e) => setValue(e.target.value)}
          className="border-2 border-gray-300 rounded-2xl mt-4 w-full p-4 text-gray-700"
          rows={14}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
