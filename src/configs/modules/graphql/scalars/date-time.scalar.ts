import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import * as _ from 'lodash';

@Scalar('DateTime', () => Date)
export class DateTimeScalar implements CustomScalar<Date, string> {
  description = 'Date custom scalar type';

  parseValue(value: string): string {
    return value; // value from the client
  }

  serialize(value: string | Date): Date {
    // value sent to the client
    if (_.isString(value)) {
      return new Date(value);
    }
    return value;
  }

  parseLiteral(ast: ValueNode): string {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  }
}
