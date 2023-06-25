import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class PingResolver {
  @Query(() => String, { name: 'ping' })
  async ping() {
    return 'pong';
  }
}
