describe('House Party: configuration', function() {
  beforeEach(module('houseparty'));

  it('shoud have a config obj', inject( function(config) {
    expect(config.api).toEqual('51bc4ec8-a0a6-427e-8016-d7359a2231b9');
    expect(config.firebase).toEqual('https://house-party-scouter.firebaseio.com');
  }));

});
