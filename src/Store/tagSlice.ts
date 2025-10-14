import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TagState {
  tags: string[];
}

const initialState: TagState = {
  tags: [],
};

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    addTag: (state, action: PayloadAction<string>) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    removeTag: (state, action: PayloadAction<string>) => {
      state.tags = state.tags.filter(tag => tag !== action.payload);
    },
  },
});

export const { setTags, addTag, removeTag } = tagSlice.actions;
export default tagSlice.reducer;
