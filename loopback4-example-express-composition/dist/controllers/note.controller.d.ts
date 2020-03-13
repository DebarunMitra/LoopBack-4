import { Count, Filter, Where } from '@loopback/repository';
import { Note } from '../models';
import { NoteRepository } from '../repositories';
export declare class NoteController {
    noteRepository: NoteRepository;
    constructor(noteRepository: NoteRepository);
    create(note: Omit<Note, 'id'>): Promise<Note>;
    count(where?: Where<Note>): Promise<Count>;
    find(filter?: Filter<Note>): Promise<Note[]>;
    updateAll(note: Partial<Note>, where?: Where<Note>): Promise<Count>;
    findById(id: number): Promise<Note>;
    updateById(id: number, note: Partial<Note>): Promise<void>;
    replaceById(id: number, note: Note): Promise<void>;
    deleteById(id: number): Promise<void>;
}
