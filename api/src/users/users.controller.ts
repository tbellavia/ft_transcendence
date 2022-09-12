import { 
    Body,
    Controller,
    Delete,
    FileTypeValidator,
    Get,
    MaxFileSizeValidator,
    Param,
    ParseFilePipe,
    Post,
    Put,
    Query,
    Req,
    Res,
    StreamableFile, 
    UploadedFile, 
    UseInterceptors} from "@nestjs/common";
import { RequestWithUser } from "src/auth/interfaces/requestWithUser.interface";
import { Readable } from "stream";
import { Public } from "../common/decorators/public.decorator";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { UsersService } from "./users.service";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("users")
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }
    

    @Post()
    async createUser(@Body() createUserDto: CreateUserDTO) {
        return this.usersService.create(createUserDto);
    }

    @Post("/:username/avatar")
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(
        @Param("username") username: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 90000 }),
                    new FileTypeValidator({ fileType: /(jpeg|png)/gm })
                ]
            })
        ) 
        file: Express.Multer.File
    ) 
    {
        return this.usersService.addAvatar(username, file.buffer);
    }

    @Post("/avatar/me")
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatarById(
        @Req() request: RequestWithUser,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 90000 }),
                    new FileTypeValidator({ fileType: /(jpeg|png)/gm })
                ],
            })
        ) 
        file: Express.Multer.File
    ) 
    {
        return this.usersService.addAvatarById(request.user.user_id, file.buffer);
    }

    @Get("/:username/avatar")
    async getAvatar(
        @Res({ passthrough: true }) response: Response,
        @Param("username") username: string
    ) 
    {
        const file: Uint8Array = await this.usersService.getAvatar(username);

        const stream = Readable.from(file);
        response.set({
            "Content-Disposition" : `inline; filename="avatar.png"`,
            "Content-Type" : "image"
        })
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

    @Get("/user/me")
    async findMe(@Req() request: RequestWithUser) {
        return request.user;
    }

    //TODO: replace :user_id by me to only delete current auth user
    @Delete("/me")
    async delete(@Req() request: RequestWithUser) {
        return this.usersService.delete(request.user.user_id);
    }
}