import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import * as usersSeed from '../seeders/users.seeder.json';
import * as bcrypt from 'bcrypt';
import { Gyms } from 'src/entities/gyms.entity';
@Injectable()
export class UserService {
    constructor(@InjectRepository(Users) private readonly userRepository: Repository<Users>,
                @InjectRepository(Gyms) private readonly gymsRepository: Repository<Gyms>) {}

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

      private async waitForGyms() {
        const pollInterval = 500; // Intervalo de espera en milisegundos (0.5 segundos)
        const timeout = 10000; // Tiempo máximo de espera en milisegundos (10 segundos)
        let elapsedTime = 0;
    
        while (elapsedTime < timeout) {
            const gymsCount = await this.gymsRepository.count();
            if (gymsCount > 0) {
                return; // Gimnasios encontrados, continuar con el flujo
            }
            await new Promise((resolve) => setTimeout(resolve, pollInterval)); // Espera activa
            elapsedTime += pollInterval;
        }
    
        throw new Error('Timeout: Gyms were not initialized in time.');
    }
      async onModuleInit() {
        await this.waitForGyms();
        const usersMock = await Promise.all(usersSeed.map(async (user) => {
          const gyms = await this.gymsRepository.find();
          console.log(gyms);
          const gymForUser = await this.gymsRepository.findOne({ where: { city: user.city } });
          console.log(gymForUser);
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
            newUser.gym = gymForUser ? gymForUser : null;
            //console.log(newUser);
            return newUser;
          }));
          for (const user of usersMock) {
            const existingUser = await this.userRepository.findOne({ where: { email: user.email } });
            if (!existingUser) {
                await this.userRepository.save(user);
            }
        }
    
        return 'Users added';
    }

}
