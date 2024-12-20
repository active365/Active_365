import { Body, Controller, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Users } from 'src/entities/users.entity';
import { AuthorizationGuard } from 'src/auth/guards/authorization.guard';
import { Rol } from 'src/decorators/roles.decorator';
import { userRoles } from 'src/enums/userRoles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    
    @Rol(userRoles.admin)
    @UseGuards(AuthorizationGuard, RolesGuard)
    @Get()
    getUser(@Query ('page') page: number, @Query ('limit') limit: number) {
        if (page && limit) {
          return this.userService.getAllUsers(+page, +limit);
        }
        return this.userService.getAllUsers(1, 5);
      }
      
    @Get(':id')
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
        return this.userService.getUserById(id);
      }

    @Put(':id')
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Partial<Users>) {
        return this.userService.updateUser(id, user);
      }

}
