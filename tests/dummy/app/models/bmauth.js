import DS from 'ember-data';

export default DS.Model.extend({
    token: DS.attr('string'),
    phone: DS.belongsTo('bmphone', { async: true } ),
    wechat: DS.belongsTo('bmwechat', { async: true })
});
