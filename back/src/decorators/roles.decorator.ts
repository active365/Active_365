import { SetMetadata } from "@nestjs/common";
import { userRoles } from '../enums/userRoles.enum';

export const Rol = (...rol: userRoles[]) => SetMetadata('rol', rol); //{roles: [Role.ADMIN Or Role.USER]}