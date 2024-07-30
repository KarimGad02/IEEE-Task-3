import { EventsService } from './events.service';
import { Event } from './event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UsersService } from '../users/users.service';
export declare class EventsResolver {
    private readonly eventsService;
    private readonly usersService;
    constructor(eventsService: EventsService, usersService: UsersService);
    events(): Promise<Event[]>;
    createEvent(createEventDto: CreateEventDto, userId: number): Promise<Event>;
    registerUserToEvent(eventId: number, userId: number): Promise<Event>;
}
