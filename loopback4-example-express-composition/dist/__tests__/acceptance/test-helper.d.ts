import { Client } from '@loopback/testlab';
import { NoteApplication } from '../../application';
import { ExpressServer } from '../../server';
import { Note } from '../../models/note.model';
export declare function setupExpressApplication(): Promise<AppWithClient>;
export interface AppWithClient {
    server: ExpressServer;
    client: Client;
    lbApp: NoteApplication;
}
/**
 * Generate a complete Note object for use with tests.
 * @param  A partial (or complete) Note object.
 */
export declare function givenNote(note?: Partial<Note>): Note;
