import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
      debugger
    return serialized;
  },

  serialize(deserialized) {
    return deserialized;
  }
});
