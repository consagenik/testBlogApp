import IApi from './IApi';
import {PostApiModel} from './entities/PostApiModel.ts';
import {
  mapApiCommentsToBLComments,
  mapApiPostsToBLPosts,
  mapApiPostToBLPost,
} from './Mapper.ts';
import {PostBLModel} from '../entities/PostBLModel.ts';
import {CommentBLModel} from '../entities/CommentBLModel.ts';

export default class Api implements IApi {
  private baseUrl = 'https://my-json-server.typicode.com/typicode/demo';

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

  public async getPosts(): Promise<PostBLModel[]> {
    const data = await this.getData('/posts');
    return mapApiPostsToBLPosts(data);
  }

  public async getPostById(id: number): Promise<PostBLModel> {
    const data = await this.getData(`/posts/${id}`);
    console.log('getPostById', data);
    return mapApiPostToBLPost(data);
  }

  public async getPostComments(id: number): Promise<CommentBLModel[]> {
    const data = await this.getData(`/posts/${id}/comments`);
    console.log('getPostComments', data);
    return mapApiCommentsToBLComments(data);
  }
}
