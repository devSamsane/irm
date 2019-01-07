import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';
import { Configuration } from './config/configuration.enum';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;
  static protocol: string;

  // tslint:disable-next-line:variable-name
  constructor(private readonly _configService: ConfigService) {
    AppModule.port = AppModule.normalizePort(_configService.get(Configuration.PORT));
    AppModule.host = _configService.get(Configuration.HOST);
    AppModule.isDev = _configService.get(Configuration.NODE_ENV) === 'development' ? true : false;
    AppModule.protocol = _configService.get(Configuration.PROTOCOL);
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
