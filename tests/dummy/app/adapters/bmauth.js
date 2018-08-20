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
		return this.ajax(`/bmauths/5b7505b68fb8074eb73cecdf`, 'POST', this.get('headOpt')(jsonObject));
	},
    queryMultipleObject(store, type, jsonObject) {
		return this.ajax(`/api/v1/phonelogin/0`, 'POST', this.get('headOpt')(jsonObject));
	}
});
