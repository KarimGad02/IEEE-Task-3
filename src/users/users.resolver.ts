import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => [User])
  users() {
    return this.usersService.findAll();
  }

  @Mutation(returns => User)
  async createUser(@Args('createUserDto') createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
