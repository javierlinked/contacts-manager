/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import { Contact } from 'src/contacts/entities/contact.entity';
import { promises as fs } from 'fs';
const path = require('path');
const Cryptr = require('cryptr');

@Injectable()
export class StorageService {
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
    return this.readDb();
  }

  async persistDatabase(db: Contact[]) {
    this.#onSaving = true;
    const ecrypedData = this.#crypt.encrypt(JSON.stringify(db));
    await fs.writeFile(path.resolve(__dirname, this.#filePath), ecrypedData);
    this.#onSaving = false;
  }

  async getNextId(): Promise<number> {
    const max: number = Math.max(...(await this.readDb()).map((o) => o.id));
    if (max !== -Infinity) {
      return max + 1;
    }
    return 1;
  }

  fileExists(): boolean {
    let exists: boolean;
    fs.stat(path.resolve(__dirname, this.#filePath)).catch(() => {
      exists = false;
    });
    exists = true;
    return exists;
  }

  protected async readDb(): Promise<Contact[]> {
    if (!this.fileExists()) {
      await this.persistDatabase([]);
      return [];
    } else {
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
}
