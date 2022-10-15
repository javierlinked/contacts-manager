/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { Contact } from 'src/contacts/entities/contact.entity';
import { promises as fs } from 'fs';
const path = require('path');
const Cryptr = require('cryptr');

@Injectable()
export class StorageService {
  #db: Contact[];
  #filePath = '../../storage/db.json.enc';
  #onSaving = false;
  #crypt: typeof Cryptr;

  constructor(private readonly logger: Logger) {
    this.#crypt = new Cryptr(
      'this is a secret key and should be changed, but for now it is ok',
    );
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
    const ecrypedData = this.#crypt.encrypt(JSON.stringify(db));
    await fs.writeFile(path.resolve(__dirname, this.#filePath), ecrypedData);
    this.#onSaving = false;
  }

  getNextId(): number {
    const max: number = Math.max(...this.#db.map((o) => o.id));
    if (max !== -Infinity) {
      return max + 1;
    }
    return 1;
  }

  fileExists(): boolean {
    let exists: boolean;
    fs.stat(path.resolve(__dirname, this.#filePath)),
      (err) => {
        if (err == null) {
          exists = true;
        } else if (err.code === 'ENOENT') {
          exists = false;
        } else {
          this.logger.warn('Some other error: ', err.code);
        }
      };
    return exists;
  }

  async createDBFile(): Promise<void> {
    await this.persistDatabase([]);
  }

  protected async readDb(): Promise<Contact[]> {
    try {
      const data = await fs.readFile(
        path.resolve(__dirname, this.#filePath),
        'utf8',
      );
      const decryptedData = this.#crypt.decrypt(data);
      return JSON.parse(decryptedData);
    } catch (e) {
      return [];
    }
  }
}
