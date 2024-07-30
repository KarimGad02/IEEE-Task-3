import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateEventDto {
  @Field()
  name: string;

  @Field()
  date: Date;

  @Field(type => Int)
  capacity: number;
}
