import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../users/user.entity';

@ObjectType()
@Entity()
export class Event {
  @Field(type => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  date: Date;

  @Field()
  @Column()
  capacity: number;

  @Field(type => [User], { nullable: true })
  @ManyToMany(() => User, user => user.events)
  @JoinTable()
  users: User[];
}
