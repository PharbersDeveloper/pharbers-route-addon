import DS from 'ember-data';

export default DS.Model.extend({
    key: DS.attr('string'),
    val: DS.attr(),
    category: DS.attr('string')
});
