import { Injectable } from '@nestjs/common';

import { Configuration } from './configuration.enum';

import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filepath: string) {
    let config: EnvConfig;
    const sharedConfig = dotenv.parse(fs.readFileSync('src/config/default.env'));
    const envConfig = dotenv.parse(fs.readFileSync(filepath));
    config = { ...sharedConfig, ...envConfig };
    this.envConfig = this.validateInput(config);
  }

  // Récupération de l'ensemble des valeurs des variables de configuration du fichier
  get(key: string): string {
    return this.envConfig[key];
  }

  // Validation de l'ensemble des variables de configuration d'environnement
  // Configuration par défaut de certaines
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const enVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PORT: Joi.number().default(3000),
      PROTOCOL: Joi.string().default('http'),
      HOST: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      enVarsSchema,
    );

    if (error) {
      throw new Error(`Erreur de validation de la configuration: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
