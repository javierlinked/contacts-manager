import { Module } from '@nestjs/common';

import { ContactsService } from './contacts/contacts.service';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsController } from './contacts/contacts.controller';
import { StorageService } from './storage/storage.service';

@Module({
  imports: [ContactsModule],
  controllers: [ContactsController],
  providers: [ContactsService, StorageService],
})
export class AppModule {}
