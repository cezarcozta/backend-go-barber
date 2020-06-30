import { container } from 'tsyringe';

import BcryptHashProvider from './HashProvider/implementation/BCryptHashProvider';
import IHashProvider from './HashProvider/models/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
