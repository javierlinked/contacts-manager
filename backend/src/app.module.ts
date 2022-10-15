import { Logger, Module } from '@nestjs/common';

import { ContactsService } from './contacts/contacts.service';
import { ContactsModule } from './contacts/contacts.module';
import { ContactsController } from './contacts/contacts.controller';
import { StorageService } from './storage/storage.service';
import { LoginModule } from './login/login.module';

@Module({
  imports: [ContactsModule, LoginModule],
  controllers: [ContactsController],
  providers: [ContactsService, StorageService, Logger],
})
export class AppModule {}
