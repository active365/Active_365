import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as usersSeed from '../seeders/users.seeder.json';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>) {}

    async getAllUsers(page: number, limit: number) {
        const users =  await this.userRepository.find();
        if(!users) throw new NotFoundException('No se encontraron usuarios');
        const start = (page - 1) * limit;
        const end = start + limit;
        return users.slice(start, end);
      }

      async getUserById(id: string) {
        const user = await this.userRepository.findOne({where: {id}});
        if(!user) throw new NotFoundException(`El usuario con el id ${id} no existe`);
        return user;
      }

      async updateUser(id: string, user: Partial<Users>) {
        const userFound = await this.userRepository.findOne({where: {id}});
        if(!userFound) throw new NotFoundException(`El usuario con el id ${id} no existe`);
        await this.userRepository.update(id, user);
        return `El usuario con el id ${id} ha sido actualizado`;
      }
      async onModuleInit() {
        const usersMock = await Promise.all(usersSeed.map(async (user) => {
            const newUser = new Users();
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.phone = user.phone;
            newUser.address = user.address;
            newUser.city = user.city;
            newUser.rol = user.rol;
            newUser.height = user.height;
            newUser.weight = user.weight;
            newUser.password = await bcrypt.hash(user.password, 10);
            return newUser;
          }));
        for(const user of usersMock) {
            const existingUser = await this.userRepository.findOne({where: {email: user.email}});
            if(!existingUser) {
                await this.userRepository
                    .createQueryBuilder()
                    .insert()
                    .into(Users)
                    .values({ name: user.name, email: user.email, phone: user.phone, address: user.address, city: user.city, rol: user.rol, height: user.height, weight: user.weight, password: user.password })
                    .execute();
            }
      }
      return 'Users added';
    }

}
