import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { User } from '../users/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
export declare class EventsService {
    private eventsRepository;
    private usersRepository;
    constructor(eventsRepository: Repository<Event>, usersRepository: Repository<User>);
    findAll(): Promise<Event[]>;
    findOne(id: number): Promise<Event>;
    create(createEventDto: CreateEventDto): Promise<Event>;
    registerUserToEvent(eventId: number, userId: number): Promise<Event>;
}
