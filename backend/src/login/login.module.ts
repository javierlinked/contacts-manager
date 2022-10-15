import { Logger, Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { StorageService } from 'src/storage/storage.service';

@Module({
  controllers: [LoginController],
  providers: [LoginService, StorageService, Logger],
})
export class LoginModule {}
