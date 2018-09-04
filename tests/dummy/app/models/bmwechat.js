import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr(),
    list: DS.attr('list')
    // openid: DS.attr(),
    // photo: DS.attr()
});
