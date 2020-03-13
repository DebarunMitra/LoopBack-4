import { juggler } from '@loopback/repository';
export declare class DsDataSource extends juggler.DataSource {
    static dataSourceName: string;
    constructor(dsConfig?: object);
}
