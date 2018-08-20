import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    openid: DS.attr(),
    photo: DS.attr()
});
