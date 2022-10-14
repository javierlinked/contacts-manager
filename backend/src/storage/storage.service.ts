import { Injectable } from '@nestjs/common';
import { Contact } from 'src/contacts/entities/contact.entity';
const fs = require('fs').promises;

@Injectable()
export class StorageService {

    protected db: Contact[];
    #FILENAME = 'db.json.enc'

    constructor() { 
        this.readDb().then((res) => {
            this.db = res;
        });
    }

    async getDb(): Promise<Contact[]> {
        return this.db;
    }

    setDatabase(db: Contact[]) {
        this.db = db;
    }

    persistDb(): void {
        return;
    }

    getNextId(): number {
        return (Math.max.apply(Math, this.db.map(function (o) {
            return o.id;
        })) + 1);
    }

    protected async readDb(){
        var path = require("path");
        const res = await fs.readFile(path.resolve(__dirname, '../../storage/' + this.#FILENAME));
        return JSON.parse(res);
    }
}
