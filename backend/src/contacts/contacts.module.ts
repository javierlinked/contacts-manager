import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { StorageService } from 'src/storage/storage.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, StorageService],
})
export class ContactsModule {}
