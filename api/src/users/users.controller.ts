import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }
    
    @Public()
    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO) {
        this.usersService.create(createUserDto);
    }

    @Public()
    @Put("/:user_id")
    async updateUser(@Body() updateUserDto: UpdateUserDTO, @Param('user_id') user_id: string) {
        this.usersService.update(updateUserDto, user_id);
    }
}