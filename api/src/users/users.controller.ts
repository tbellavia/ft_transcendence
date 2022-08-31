import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { Public } from "../common/decorators/public.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }
    
    
    //TODO: removes it at end (user should not be able to creates other users)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO) {
        return this.usersService.create(createUserDto);
    }

    //TODO: replace :user_id by me to only updates current auth user
    @Put("/:user_id")
    async updateUser(@Body() updateUserDto: UpdateUserDTO, @Param('user_id') user_id: string) {
        this.usersService.update(updateUserDto, user_id);
    }

    
    @Get()
    async findAllUsers(@Query() query) {
        if ( "limit" in query )
            return await this.usersService.findAll(+query.limit);
        return await this.usersService.findAll();
    }

    //TODO: replace :user_id by me to only get current auth user
    @Get("/:user_id")
    async findOne(@Param("user_id") user_id: string) {
        return await this.usersService.findOne(user_id);
    }

    //TODO: replace :user_id by me to only delete current auth user
    @Delete("/:user_id")
    async delete(@Param("user_id") user_id: string){
        this.usersService.delete(user_id);
    }
}