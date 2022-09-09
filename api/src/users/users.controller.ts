import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Req, SerializeOptions } from "@nestjs/common";
import { RequestWithUser } from "src/auth/interfaces/requestWithUser.interface";
import { Public } from "../common/decorators/public.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }
    

    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO) {
        return this.usersService.create(createUserDto);
    }

    @Put("/me")
    async updateUser(
        @Req() request: RequestWithUser,
        @Body() updateUserDto: UpdateUserDTO, 
    ) {
        return this.usersService.update(updateUserDto, request.user.user_id);
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
        return await this.usersService.findOneByName(username);
    }

    //TODO: replace :user_id by me to only delete current auth user
    @Delete("/me")
    async delete(@Req() request: RequestWithUser) {
        return this.usersService.delete(request.user.user_id);
    }
}