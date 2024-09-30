import { configureStore } from "@reduxjs/toolkit";
import recordsReducer from "./slices/records";

export const store = configureStore({
    reducer: {
        records: recordsReducer
    },
});
