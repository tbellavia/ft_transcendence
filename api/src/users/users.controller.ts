import { 
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
    StreamableFile } from "@nestjs/common";
import { RequestWithUser } from "src/auth/interfaces/requestWithUser.interface";
import { Readable } from "stream";
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

    @Get("/:username/avatar")
    async getAvatar(
        @Param("username") username: string, 
        @Res({ passthrough: true }) response: Response
    ) 
    {
        const file: Uint8Array = await this.usersService.getAvatar(username);

        const stream = Readable.from(file);
        return new StreamableFile(stream);
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