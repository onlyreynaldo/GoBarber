import { container } from 'tsyringe';
import IStorageProvider from '../providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '../providers/StorageProviders/implementations/DiskStorageProvider';

import EtherialMailProvider from '../providers/MailProvider/implementations/EtherialMailProvider';
import IMailProvider from '../providers/MailProvider/models/IMailProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
container.registerInstance<IMailProvider>('MailProvider', new EtherialMailProvider());
