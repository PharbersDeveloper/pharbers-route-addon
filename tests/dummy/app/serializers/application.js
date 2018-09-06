import PharbersSerializer from 'pharbers-route-addon/serializer/phserializer';
import { decamelize, dasherize } from '@ember/string';
import { pluralize, singularize } from 'ember-inflector';

/**
 * 所有的Serializer都要继承phserializer
 * 数据有特殊需求直接在normalizeResponse自己修改
 * @type {String}
 */
export default PharbersSerializer.extend({
	primaryKey: 'id',
	payloadKeyFromModelName(modelName) {
		return modelName
	},
	modelNameFromPayloadKey(modelName) {
		return modelName
	}
	// serialize(snapshot) {
	// 	let json = this._super(...arguments);
	// 	json.data.type = singularize(json.data.type)
	// 	console.info(json)
	// 	return json
	// },
	normalizeResponse(store, model, payload) {
		this._super(...arguments);
		return payload;
	}
});
