import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { User } from '../users/user.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Event[]> {
    return this.eventsRepository.find({ relations: ['users'] });
  }

  findOne(id: number): Promise<Event> {
    return this.eventsRepository.findOne({ where: { id }, relations: ['users'] });
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const event = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(event);
  }

  async registerUserToEvent(eventId: number, userId: number): Promise<Event> {
    const event = await this.eventsRepository.findOne({ where: { id: eventId }, relations: ['users'] });
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!event || !user) {
      throw new Error('Event or User not found');
    }

    if (event.users.some(existingUser => existingUser.id === user.id)) {
      throw new Error('User is already registered for this event');
    }

    if (event.users.length >= event.capacity) {
      throw new Error('Event is full');
    }

    event.users.push(user);

    event.capacity -= 1;

    return this.eventsRepository.save(event);
  }
}
