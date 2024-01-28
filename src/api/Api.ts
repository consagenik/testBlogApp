import IApi from './IApi';
import {
  mapApiCommentsToBLComments,
  mapApiCommentToBLComment,
  mapApiPostsToBLPosts,
  mapApiPostToBLPost,
} from './Mapper.ts';
import {PostBLModel} from '../entities/PostBLModel.ts';
import {CommentBLModel} from '../entities/CommentBLModel.ts';

export default class Api implements IApi {
  private baseUrl =
    'https://my-json-server.typicode.com/consagenik/testBlogApp/';

  private async fetchData(path: string, requestOptions: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${path}`, requestOptions);
      return await response.json();
    } catch (e) {
      console.log('API ERROR:', e);
      throw new Error(`API line 174 ${e}`);
    }
  }

  private async getData(path: string): Promise<any> {
    const myHeaders = new Headers();
    const requestOptions: {
      method: string;
      headers: Headers;
      redirect: 'follow' | 'error' | 'manual' | undefined;
    } = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    return this.fetchData(path, requestOptions);
  }

  private async postData(path: string, data?: any): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions: {
      method: string;
      headers: Headers;
      body: string;
      redirect: 'follow' | 'error' | 'manual' | undefined;
    } = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow',
    };

    return this.fetchData(path, requestOptions);
  }

  private async putData(path: string, data?: any): Promise<any> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions: {
      method: string;
      headers: Headers;
      body: string;
      redirect: 'follow' | 'error' | 'manual' | undefined;
    } = {
      method: 'PUT',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow',
    };

    return this.fetchData(path, requestOptions);
  }

  private async deleteData(path: string): Promise<any> {
    const myHeaders = new Headers();
    const requestOptions: {
      method: string;
      headers: Headers;
      redirect: 'follow' | 'error' | 'manual' | undefined;
    } = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    return this.fetchData(path, requestOptions);
  }

  public async getPosts(): Promise<PostBLModel[]> {
    const resp = await this.getData('/posts');
    return mapApiPostsToBLPosts(resp);
  }

  public async getPostById(id: number): Promise<PostBLModel> {
    const resp = await this.getData(`/posts/${id}`);
    return mapApiPostToBLPost(resp);
  }

  public async getPostComments(id: number): Promise<CommentBLModel[]> {
    const resp = await this.getData(`/posts/${id}/comments`);
    return mapApiCommentsToBLComments(resp);
  }

  public async createPost(data: PostBLModel): Promise<PostBLModel> {
    const resp = await this.postData('/posts', data);
    return mapApiPostToBLPost(resp);
  }

  public async editPost(id: number, data: PostBLModel): Promise<PostBLModel> {
    const resp = await this.postData(`/posts/${id}`, data);
    return mapApiPostToBLPost(resp);
  }

  public async createComment(
    id: number,
    data: CommentBLModel,
  ): Promise<CommentBLModel> {
    const resp = await this.postData(`/posts/${id}/comments`, data);
    return mapApiCommentToBLComment(resp);
  }

  public async editComment(
    commentId: number,
    data: CommentBLModel,
  ): Promise<CommentBLModel> {
    const resp = await this.putData(`/comments/${commentId}`, data);
    return mapApiCommentToBLComment(resp);
  }

  public async deleteComment(commentId: number): Promise<void> {
    await this.deleteData(`/comments/${commentId}`);
  }
}
