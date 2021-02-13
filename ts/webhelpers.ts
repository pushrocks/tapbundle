import * as plugins from './tapbundle.plugins';
import type { fixture, html } from '@open-wc/testing-helpers';
import { tap } from './tapbundle.classes.tap';

class WebHelpers {
  html: typeof html;
  fixture: typeof fixture;

  constructor() {
    const smartenv = new plugins.smartenv.Smartenv();
    if(smartenv.isBrowser) {
      this.enable();
    }
  }

  public enable() {
    tap.preTask('enable webhelpers', async () => {
      const webhelpers = await import('@open-wc/testing-helpers')
      this.html = webhelpers.html;
      this.fixture = webhelpers.fixture;
    })
  }
}

export const webhelpers = new WebHelpers();
