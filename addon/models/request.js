import DS from 'ember-data';

export default DS.Model.extend({
    res: DS.attr('string'),
    eqcond: DS.hasMany('eqcond', { async: false }),
    upcond: DS.hasMany('upcond', { async: false }),
    fmcond: DS.belongsTo('fmcond', { async: false }),
});
