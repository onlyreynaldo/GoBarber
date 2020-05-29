import { container } from 'tsyringe';
import IStorageProvider from '../providers/StorageProviders/models/IStorageProvider';
import DiskStorageProvider from '../providers/StorageProviders/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>('StorageProvider', DiskStorageProvider);
