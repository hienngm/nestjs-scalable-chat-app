export interface ISubscriber {
  id: string;
  userId: string;
  username: string;
  asyncIterator?: any;
  tokenExpireAt: number;
}
