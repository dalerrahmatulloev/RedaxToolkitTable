import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../src/reducers/counter/todoSlice";

export const store = configureStore({
    reducer: {
        todo: todoSlice
    }
})