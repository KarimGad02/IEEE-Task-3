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
exports.EventsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const events_service_1 = require("./events.service");
const event_entity_1 = require("./event.entity");
const create_event_dto_1 = require("./dto/create-event.dto");
const users_service_1 = require("../users/users.service");
let EventsResolver = class EventsResolver {
    constructor(eventsService, usersService) {
        this.eventsService = eventsService;
        this.usersService = usersService;
    }
    events() {
        return this.eventsService.findAll();
    }
    async createEvent(createEventDto, userId) {
        const user = await this.usersService.findOne(userId);
        if (user.role !== 'admin') {
            throw new Error('Only admins can create events');
        }
        return this.eventsService.create(createEventDto);
    }
    async registerUserToEvent(eventId, userId) {
        return this.eventsService.registerUserToEvent(eventId, userId);
    }
};
exports.EventsResolver = EventsResolver;
__decorate([
    (0, graphql_1.Query)(returns => [event_entity_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsResolver.prototype, "events", null);
__decorate([
    (0, graphql_1.Mutation)(returns => event_entity_1.Event),
    __param(0, (0, graphql_1.Args)('createEventDto')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Number]),
    __metadata("design:returntype", Promise)
], EventsResolver.prototype, "createEvent", null);
__decorate([
    (0, graphql_1.Mutation)(returns => event_entity_1.Event),
    __param(0, (0, graphql_1.Args)('eventId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], EventsResolver.prototype, "registerUserToEvent", null);
exports.EventsResolver = EventsResolver = __decorate([
    (0, graphql_1.Resolver)(of => event_entity_1.Event),
    __metadata("design:paramtypes", [events_service_1.EventsService,
        users_service_1.UsersService])
], EventsResolver);
//# sourceMappingURL=events.resolver.js.map