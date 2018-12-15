import { Injectable } from '@nestjs/common';

import { get } from 'config';

import { Configuration } from './configuration.enum';

@Injectable()
export class ConfigurationService {

  // Configuration de la connexion à la db
  static connectionString: string = process.env[Configuration.MONGO_URI] || get(Configuration.MONGO_URI);
  // Configuration de la variable d'environnement
  private environmentHosting: string = process.env.NODE_ENV || 'development';

  get(name: string) {
    return process.env[name] || get(name);
  }

  get isDevelopment(): boolean {
    return this.environmentHosting === 'development';
  }

}
