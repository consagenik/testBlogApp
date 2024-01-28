import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PostBLModel} from '../../entities/PostBLModel.ts';
export interface PostState {
  posts: PostBLModel[];
  selectedPostId: number | undefined;
  editPost: boolean;
}

const initialState: PostState = {
  posts: [],
  selectedPostId: undefined,
  editPost: false,
};

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostBLModel[]>) => ({
      ...state,
      posts: action.payload,
    }),
    setSelectedPostId: (state, action: PayloadAction<number | undefined>) => ({
      ...state,
      selectedPostId: action.payload,
    }),
    setEditPost: (state, action: PayloadAction<boolean>) => ({
      ...state,
      editPost: action.payload,
    }),
    updatePost: (state, action: PayloadAction<PostBLModel>) => ({
      ...state,
      posts: state.posts.map(post => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      }),
    }),
    addPost: (state, action: PayloadAction<PostBLModel>) => ({
      ...state,
      posts: [...state.posts, action.payload],
    }),
  },
  extraReducers: builder => {},
});

const {actions, reducer} = postSlice;
// Extract and export each action creator by name
export const {setPosts, setSelectedPostId, setEditPost, updatePost, addPost} =
  actions;
// Export the reducer, either as a default or named export
export default reducer;
