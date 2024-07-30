import { User } from '../users/user.entity';
export declare class Event {
    id: number;
    name: string;
    date: Date;
    capacity: number;
    users: User[];
}
