import DS from 'ember-data';

export default DS.Model.extend({
    res: DS.attr('string'),
    eq_cond: DS.hasMany('eq_cond'),
    up_cond: DS.hasMany('up_cond'),
    fm_cond: DS.belongsTo('fm_cond', { async: false })
});
