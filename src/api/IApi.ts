import {CommentBLModel} from '../entities/CommentBLModel.ts';
import {PostBLModel} from '../entities/PostBLModel.ts';

export default interface IApi {
  getPosts(): Promise<PostBLModel[]>;
  getPostById(id: number): Promise<PostBLModel>;
  getPostComments(id: number): Promise<CommentBLModel[]>;
  createPost(data: PostBLModel): Promise<PostBLModel>;
  editPost(id: number, data: PostBLModel): Promise<PostBLModel>;
  createComment(postId: number, data: CommentBLModel): Promise<CommentBLModel>;
  editComment(commentId: number, data: CommentBLModel): Promise<CommentBLModel>;
  deleteComment(commentId: number): Promise<void>;
}
