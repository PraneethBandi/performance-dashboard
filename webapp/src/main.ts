
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';

require('../node_modules/bootflat/css/bootstrap.min.css');
require('../node_modules/bootflat/css/site.min.css');

require('../node_modules/bootflat/bootflat/js/icheck.min.js');
require('../node_modules/bootflat/js/bootstrap.min.js');
// require('../node_modules/bootflat/js/jquery-1.10.1.min.js');
// require('../node_modules/bootflat/js/respond.min.js');
require('../node_modules/bootflat/js/site.min.js');

require('../node_modules/bootflat/bootflat/img/check_flat/default.png');

require('../node_modules/bootflat/fonts/glyphicons-halflings-regular.eot');
require('../node_modules/bootflat/fonts/glyphicons-halflings-regular.svg');
require('../node_modules/bootflat/fonts/glyphicons-halflings-regular.ttf');
require('../node_modules/bootflat/fonts/glyphicons-halflings-regular.woff');


if (process.env.ENV === 'production') {
  enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
