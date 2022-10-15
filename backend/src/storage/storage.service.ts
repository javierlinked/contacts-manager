import { Injectable } from '@nestjs/common';
import { Contact } from 'src/contacts/entities/contact.entity';
import { promises as fs } from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

@Injectable()
export class StorageService {
  #db: Contact[];
  #filePath = '../../storage/db.json.enc';
  #onSaving = false;

  constructor() {
    this.readDb().then((res) => {
      this.#db = res;
    });
  }

  async getDb(): Promise<Contact[]> {
    while (this.#onSaving) {
      await new Promise((r) => setTimeout(r, 100));
    }
    return this.#db;
  }

  async persistDatabase(db: Contact[]) {
    this.#onSaving = true;
    this.#db = db;
    await fs.writeFile(
      path.resolve(__dirname, this.#filePath),
      JSON.stringify(db),
    );
    this.#onSaving = false;
  }

  getNextId(): number {
    const max: number = Math.max(...this.#db.map((o) => o.id));
    if (max !== -Infinity) {
      return max + 1;
    }
    return 1;
  }

  protected async readDb(): Promise<Contact[]> {
    try {
      const data = await fs.readFile(
        path.resolve(__dirname, this.#filePath),
        'utf8',
      );
      return JSON.parse(data);
    } catch (e) {
      return [];
    }

    // const res = await fs.readFile(path.resolve(__dirname, this.#filePath), {
    //   encoding: 'utf8',
    // });
    // if (res) {
    //   return JSON.parse(res);
    // }
    // return [];
  }
}
