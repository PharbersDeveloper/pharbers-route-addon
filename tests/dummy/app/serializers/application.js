import PharbersSerializer from 'pharbers-route-addon/serializer/phserializer';
import { dasherize, classify } from '@ember/string';
// import { pluralize, singularize} from 'ember-inflector';

/**
 * 所有的Serializer都要继承phserializer
 * 数据有特殊需求直接在normalizeResponse自己修改
 * @type {String}
 */
export default PharbersSerializer.extend({
	keyForAttribute(key) {
		return key;
	},
	keyForRelationship(key) {
		return classify(key);
	},
	payloadKeyFromModelName(modelName) {
		return classify(modelName);
	},
	modelNameFromPayloadKey(modelName) {
		return dasherize(modelName);
	},
	// serialize(snapshot) {
	//     let json = this._super(...arguments);
	//     json.data.type = singularize(json.data.type)
	//     return json
	// },
	normalizeResponse(store, model, payload) {
		this._super(...arguments);
		return payload;
	},
});
