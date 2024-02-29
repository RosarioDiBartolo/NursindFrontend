import { Api } from './Utils.ts'

import config from './app.config.json'

export const backend = new Api(config['backend-url']);

