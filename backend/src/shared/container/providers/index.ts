import { container } from 'tsyringe';
import IStorageProvider from '../providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '../providers/StorageProviders/implementations/DiskStorageProvider';

import EtherialMailProvider from '../providers/MailProvider/implementations/EtherialMailProvider';
import IMailProvider from '../providers/MailProvider/models/IMailProvider';

import HandlebarsMailTemplateProvider from '../providers/MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';
import IMailTemplateProvider from '../providers/MailTemplateProvider/models/IMailTemplateProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerSingleton<IMailTemplateProvider>('MailTemplateProvider', HandlebarsMailTemplateProvider);
container.registerInstance<IMailProvider>('MailProvider', container.resolve(EtherialMailProvider));
