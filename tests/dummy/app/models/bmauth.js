import DS from 'ember-data';

export default DS.Model.extend({
    token: DS.attr('string'),
    phone: DS.belongsTo('bmphone', { async:  false}),
    wechat: DS.hasMany('bmwechat')
});
