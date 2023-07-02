export interface ISubscriber {
  id: string;
  userId: string;
  username: string;
  tokenExpireAt: number;
  onDisconnect?: () => any;
}
