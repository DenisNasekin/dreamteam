import { createSlice } from '@reduxjs/toolkit';

export interface IRecord {
    id: string | number;
    title: string;
    description: string;
} 

export interface IRecordsState {
    records: IRecord[];
  }

const initialState: IRecordsState = {
    records: [],
};


const recordsSlice = createSlice({
    name:'records',
    initialState,
    reducers: {
        addRecord(state, action: { payload: IRecord }) {
            state.records.push(action.payload);
        },
        updateRecord(state, action: { payload: IRecord }) {
            const index = state.records.findIndex((record) => record.id === action.payload.id);
            if (index !== -1) {
              return {
                ...state,
                records: [
                  ...state.records.slice(0, index),
                  action.payload,
                  ...state.records.slice(index + 1),
                ],
              };
            }
            return state;
          },
    },
});

export const { addRecord, updateRecord  } = recordsSlice.actions;
export default recordsSlice.reducer;