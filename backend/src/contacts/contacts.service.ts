import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    private readonly storageService: StorageService,
    private readonly logger: Logger,
  ) {}

  async create(createContactDto: Contact) {
    const db = await this.storageService.getDb();
    createContactDto.id = await this.storageService.getNextId();
    await this.storageService.persistDatabase([...db, createContactDto]);
  }

  async findAll(): Promise<Contact[]> {
    return await this.storageService.getDb();
  }

  async findOne(id: number): Promise<Contact> {
    return (await this.storageService.getDb()).find((x) => x.id === id);
  }

  async update(id: number, updateContactDto: Contact): Promise<void> {
    const db = await this.storageService.getDb();
    const temp = db.filter((x) => x.id != id);
    await this.storageService.persistDatabase([...temp, updateContactDto]);
  }

  async remove(id: number) {
    const temp = (await this.storageService.getDb()).filter((x) => x.id != id);
    await this.storageService.persistDatabase(temp);
  }

  async search(q: string): Promise<Contact[]> {
    this.logger.verbose(`Searching for ${q}`);
    const result = (await this.storageService.getDb()).filter((x) => {
      return (
        x.phone.includes(q) || x.email.includes(q) || x.address.includes(q)
      );
    });
    return result;
  }
}
