import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';;

@Injectable()
export class GoogleUserAuthGuard extends AuthGuard('google-users') {}
