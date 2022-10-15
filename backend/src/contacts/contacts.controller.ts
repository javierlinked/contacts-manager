import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from './entities/contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: Contact): Promise<void> {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return await this.contactsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Contact> {
    return await this.contactsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateContactDto: Contact) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.contactsService.remove(+id);
  }

  @Get('/search/:q')
  async search(@Param('q') q: string): Promise<Contact[]> {
    return await this.contactsService.search(q);
  }
}
