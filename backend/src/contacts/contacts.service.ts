import { Injectable } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  
  constructor(private readonly storageService: StorageService) {  }

  async create(createContactDto: Contact) {
    const db = await this.storageService.getDb();
    createContactDto.id = this.storageService.getNextId();
    this.storageService.setDatabase([...db, createContactDto]);
  }

  async findAll() {
    return await this.storageService.getDb();
  }

  async findOne(id: number): Promise<Contact> {
    return (await this.storageService.getDb()).find(x => x.id === id);
  }

  async update(id: number, updateContactDto: Contact) {
    const db = await this.storageService.getDb();
    const temp = db.filter(x => x.id != id);
    this.storageService.setDatabase( [...temp, updateContactDto]);
  }

  async remove(id: number) {
    const temp = (await this.storageService.getDb()).filter(x => x.id != id);
    this.storageService.setDatabase(temp);
  }


}
