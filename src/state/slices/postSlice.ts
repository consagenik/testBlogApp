import {createSlice, PayloadAction} from '@reduxjs/toolkit';
export interface PostState {
  selectedPostId: number | undefined;
}

const initialState: PostState = {
  selectedPostId: undefined,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    // Reducer comes here
    setSelectedPostId: (state, action: PayloadAction<number | undefined>) => ({
      ...state,
      selectedPostId: action.payload,
    }),
  },
  extraReducers: builder => {},
});

const {actions, reducer} = postSlice;
// Extract and export each action creator by name
export const {setSelectedPostId} = actions;
// Export the reducer, either as a default or named export
export default reducer;
