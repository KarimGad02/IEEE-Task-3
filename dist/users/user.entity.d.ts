import { Event } from '../events/event.entity';
export declare class User {
    id: number;
    username: string;
    password: string;
    role: string;
    events: Event[];
}
