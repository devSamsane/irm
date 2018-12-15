import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationService } from './shared/configuration/configuration.service';

import { SharedModule } from './shared/shared.module';
import { Configuration } from './shared/configuration/configuration.enum';

@Module({
  imports: [SharedModule],
  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;

  // tslint:disable-next-line:variable-name
  constructor(private readonly _configurationService: ConfigurationService) {
    AppModule.port = AppModule.normalizePort(_configurationService.get(Configuration.PORT));
    AppModule.host = _configurationService.get(Configuration.HOST);
    AppModule.isDev = _configurationService.isDevelopment;
  }

  private static normalizePort(port: number | string): number | string {
    const portNumber: number = typeof port === 'string' ? parseInt(port, 10) : port;

    if (isNaN(portNumber)) {
      return port;
    } else if (portNumber >= 0) {
      return portNumber;
    }
  }

}
