import {CommentBLModel} from '../entities/CommentBLModel.ts';
import {PostBLModel} from '../entities/PostBLModel.ts';

export default interface IApi {
  getPosts(): Promise<PostBLModel[]>;
  getPostById(id: number): Promise<PostBLModel>;
  getPostComments(id: number): Promise<CommentBLModel[]>;
}
