import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get('isFirstLogin')
  async isFirstLogin(): Promise<boolean> {
    return this.loginService.isFirstLogin();
  }

  @Post()
  doLogin(@Body() body: any) {
    return this.loginService.doLogin(body.token);
  }
}
