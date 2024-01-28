import {PostApiModel} from './entities/PostApiModel.ts';
import {PostBLModel} from '../entities/PostBLModel.ts';
import {CommentBLModel} from '../entities/CommentBLModel.ts';
import {CommentApiModel} from './entities/CommentApiModel.ts';

export const mapApiPostToBLPost = (post: PostApiModel): PostBLModel => {
  return {
    id: post.id,
    title: post.title,
    body: post.body,
  };
};

export const mapApiPostsToBLPosts = (posts: PostApiModel[]): PostBLModel[] => {
  return posts.map(post => mapApiPostToBLPost(post));
};

export const mapApiCommentToBLComment = (
  comment: CommentApiModel,
): CommentBLModel => {
  return {
    id: comment.id,
    postId: comment.postId,
    text: comment.text,
  };
};

export const mapApiCommentsToBLComments = (
  comments: CommentApiModel[],
): CommentBLModel[] => {
  return comments.map(comment => mapApiCommentToBLComment(comment));
};
