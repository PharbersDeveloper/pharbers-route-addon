import DS from 'ember-data';
import { inject } from '@ember/service';

export default DS.JSONAPIAdapter.extend({
    cookies: inject(),
    headOpt(query) {
        return {
            dataType: 'json',
            contentType: 'application/json,charset=utf-8',
            Accept: 'application/json,charset=utf-8',
            data: query
        }
    },
    headers: {},
    queryObject(store, type, jsonObject) {
        this.set('headers.Authorization', "bearer " + this.get('cookies').read('token'))
		return this.ajax(`business url`, 'POST', this.get('headOpt')(jsonObject));
	},
    queryMultipleObject(store, type, jsonObject) {
        this.set('headers.Authorization', "bearer " + this.get('cookies').read('token'))
		return this.ajax(`business url`, 'POST', this.get('headOpt')(jsonObject));
	},
    transaction(store, type, jsonObject) {
        this.set('headers.Authorization', "bearer " + this.get('cookies').read('token'))
		return this.ajax(`business url`, 'POST', this.get('headOpt')(jsonObject));
	},
});
