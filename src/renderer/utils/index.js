import path from 'path'
import { remote } from 'electron'

const LAUNCHER_HOME = path.join(remote.app.getPath('appData'), 'better-launcher')

const SKINS = path.join(LAUNCHER_HOME, 'skins')

export {
    LAUNCHER_HOME,
    SKINS
}

String.prototype.toCamelCase = function() {
    return this
        .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
        .replace(/\s/g, '')
        .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
}