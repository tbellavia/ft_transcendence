import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from 'joi';

@Module({
  imports: [ConfigModule.forRoot({
    validationSchema: Joi.object({
      // Postgres db config data source
      POSTGRES_HOST: Joi.string().hostname().required(),
      POSTGRES_PORT: Joi.number().required(),
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().min(8).required(),
      POSTGRES_DATABASe: Joi.string().required,
      //Authentication config (oauth2 and Jwt)
      API_UID: Joi.string().required(),
      API_SECRET: Joi.string().required(),
      API_CALLBACK_URL: Joi.string().uri({
        scheme: ['http', 'https']
      }).required(),
      JWT_SECRET: Joi.string().required(),
      //Genera config
      APP_NAME: Joi.string().required()
    })
  })],
})
export class ConfigurationModule {}