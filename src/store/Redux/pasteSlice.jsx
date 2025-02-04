import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  pastes: (() => {
    try {
      const savedPastes = localStorage.getItem("pastes");
      return savedPastes ? JSON.parse(savedPastes) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  })(),
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },
    updateToPastes: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(
        (paste) => paste._id === updatedPaste._id
      );
      if (index !== -1) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast("All pastes have been reset");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted Successfully");
      }
    },
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes } =
  pasteSlice.actions;

export default pasteSlice.reducer;

// removeFromPastes: (state, action) => {
//   const pasteId = action.payload;
//   state.pastes = state.pastes.filter((paste) => paste._id !== pasteId);
//   localStorage.setItem("pastes", JSON.stringify(state.pastes)); // Save updated pastes to localStorage
//   toast("Paste Deleted Successfully");
// },
