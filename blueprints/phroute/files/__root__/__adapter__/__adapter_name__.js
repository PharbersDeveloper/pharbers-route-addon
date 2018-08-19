import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
    headOpt(query) {
        return {
            dataType: 'json',
            contentType: 'application/json,charset=utf-8',
            Accept: 'application/json,charset=utf-8',
            data: query
        }
    },
    queryObject(store, type, jsonObject) {
		return this.ajax(`business url`, 'POST', this.get('headOpt')(jsonObject));
	},
    queryMultipleObject(store, type, jsonObject) {
		return this.ajax(`business url`, 'POST', this.get('headOpt')(jsonObject));
	}
});
