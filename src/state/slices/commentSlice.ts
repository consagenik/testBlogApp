import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommentBLModel} from '../../entities/CommentBLModel.ts';
export interface CommentState {
  comments: CommentBLModel[];
  editCommentId: number | undefined;
}

const initialState: CommentState = {
  comments: [],
  editCommentId: undefined,
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentBLModel[]>) => ({
      ...state,
      comments: action.payload,
    }),
    updateComment: (state, action: PayloadAction<CommentBLModel>) => {
      const updatedComments = state.comments.map(comment => {
        if (comment.id === action.payload.id) {
          return action.payload;
        }
        return comment;
      });

      return {
        ...state,
        comments: [...updatedComments],
      };
    },
    addComment: (state, action: PayloadAction<CommentBLModel>) => ({
      ...state,
      comments: [...state.comments, action.payload],
    }),
    deleteComment: (state, action: PayloadAction<number>) => ({
      ...state,
      comments: state.comments.filter(comment => comment.id !== action.payload),
    }),
  },
  extraReducers: builder => {},
});

const {actions, reducer} = commentSlice;
// Extract and export each action creator by name
export const {setComments, updateComment, addComment, deleteComment} = actions;
// Export the reducer, either as a default or named export
export default reducer;
