import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { userRoles } from 'src/enums/userRoles.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<userRoles[]>('rol', [
      context.getHandler(),
      context.getClass(), 
    ]);
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    const hasRole = () => requireRoles.some((role) => user?.rol?.includes(role));
    const valid = user && user.rol && hasRole();
    if(!valid) throw new ForbiddenException('You do not have permission to access this route')
    return valid;
  }
}
