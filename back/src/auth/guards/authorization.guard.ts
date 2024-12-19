import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) throw new UnauthorizedException('No token provided');

        try{
            const secret = process.env.JWT_SECRET;
            const user = this.jwtService.verify(token, {secret}); //{id,email,rol}
            
            user.exp = new Date(user.exp * 1000);
            user.iat = new Date(user.iat * 1000);
            
            request.user = {
                id: user.id,
                email: user.email,
                rol: user.rol,
            };
            return true;
        }
        catch (e) {
            throw new UnauthorizedException('Invalid token');}
    }
}