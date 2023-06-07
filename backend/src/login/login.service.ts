/**
 * Checks if the user has logged in before.
 * @returns boolean
 */
async isFirstLogin(): Promise<boolean> {
  return !(await this.storageService.fileExists());
}

/**
 * Checks if the token is correct and logs in the user if it is.
 * @param token string
 * @returns boolean
 */
async doLogin(token: string): Promise<boolean> {
  if (token === '
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
