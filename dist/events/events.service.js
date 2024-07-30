"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const event_entity_1 = require("./event.entity");
const user_entity_1 = require("../users/user.entity");
let EventsService = class EventsService {
    constructor(eventsRepository, usersRepository) {
        this.eventsRepository = eventsRepository;
        this.usersRepository = usersRepository;
    }
    findAll() {
        return this.eventsRepository.find({ relations: ['users'] });
    }
    findOne(id) {
        return this.eventsRepository.findOne({ where: { id }, relations: ['users'] });
    }
    async create(createEventDto) {
        const event = this.eventsRepository.create(createEventDto);
        return this.eventsRepository.save(event);
    }
    async registerUserToEvent(eventId, userId) {
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
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map