import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from 'src/storage/storage.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly storageService: StorageService,
    private readonly logger: Logger,
  ) {}

  async isFirstLogin(): Promise<boolean> {
    return !(await this.storageService.fileExists());
  }

  async doLogin(token: string): Promise<boolean> {
    if (token === '123456') {
      this.logger.log('Login successful');
      await this.storageService.getDb();
      return true;
    } else {
      this.logger.log('Login failed');
      return false;
    }
  }
}
