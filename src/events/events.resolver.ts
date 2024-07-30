import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UsersService } from '../users/users.service';

@Resolver(of => Event)
export class EventsResolver {
  constructor(
    private readonly eventsService: EventsService,
    private readonly usersService: UsersService,
  ) {}

  @Query(returns => [Event])
  events() {
    return this.eventsService.findAll();
  }

  @Mutation(returns => Event)
  async createEvent(
    @Args('createEventDto') createEventDto: CreateEventDto,
    @Args('userId') userId: number
  ): Promise<Event> {
    const user = await this.usersService.findOne(userId);
    if (user.role !== 'admin') {
      throw new Error('Only admins can create events');
    }
    return this.eventsService.create(createEventDto);
  }

  @Mutation(returns => Event)
  async registerUserToEvent(
    @Args('eventId') eventId: number,
    @Args('userId') userId: number
  ): Promise<Event> {
    return this.eventsService.registerUserToEvent(eventId, userId);
  }
}
