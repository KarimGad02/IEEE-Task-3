import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Event } from '../events/event.entity';

@ObjectType()
@Entity()
export class User {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  role: string;

  @Field(type => [Event], { nullable: true })
  @ManyToMany(() => Event, event => event.users)
  events: Event[];
}
