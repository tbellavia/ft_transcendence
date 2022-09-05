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
    @Put("/:username")
    async updateUser(@Body() updateUserDto: UpdateUserDTO, @Param('username') username: string) {
        return this.usersService.update(updateUserDto, username);
    }

    
    @Get()
    async findAllUsers(@Query() query) {
        if ( "limit" in query )
            return await this.usersService.findAll(+query.limit);
        return await this.usersService.findAll();
    }

    //TODO: replace :user_id by me to only get current auth user
    @Get("/:username")
    async findOne(@Param("username") username: string) {
        return await this.usersService.findOne(username);
    }

    //TODO: replace :user_id by me to only delete current auth user
    @Delete("/:username")
    async delete(@Param("username") username: string){
        return this.usersService.delete(username);
    }
}