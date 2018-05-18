/* @flow */

import Wwdc2010ModelLoader from './index';

describe('Wwdc2010ModelLoader', () => {
  test('loads an empty model', () => {
    const model = Wwdc2010ModelLoader.load();
    expect(model.faces).toHaveLength(0);
  });
});
