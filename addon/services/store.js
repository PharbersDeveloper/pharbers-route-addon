import DS from 'ember-data';
import { assert } from '@ember/debug';
import normalizeModelName from "../-private/normalize-model-name";
import { isPresent, isEmpty } from '@ember/utils';

import {
	promiseArray,
	promiseObject
} from "../-private/promise-proxies";

import {
	_queryObject,
	_queryMultipleObject,
	_transaction
} from "../-private/store-finders";

/**
 * 重新扩展DS.Stroe方法
 */
export default DS.Store.extend({

	init() {
		this._super(...arguments)
		window.console.log("The Custom DS.Store Init()")
	},

	queryObject(url, modelName, jsonObject) {
		let normalizedModelName = normalizeModelName(modelName);
		let adapter = this.adapterFor(normalizedModelName);
		assert(`you must implement 'queryObject' in your ${modelName} Adapter`, typeof adapter.queryObject === 'function');
		return promiseObject(
			_queryObject(url,
				adapter,
				this,
				modelName,
				jsonObject)
			.then(internalModel => {
				if (internalModel) {
					return internalModel.getRecord();
				}
				return null;
			}));
	},

	queryMultipleObject(url, modelName, jsonObject) {
		assert(`You need to pass a model name: ${modelName} to the store's queryMultipleObject method`, isPresent(modelName));
		assert(`You need to pass a queryMultipleObject hash to the store's queryMultipleObject method`, jsonObject);
		assert(`Passing classes to store methods has been removed. Please pass a dasherized string instead of ${modelName}`, typeof modelName === 'string');
		let normalizedModelName = normalizeModelName(modelName);
		let adapter = this.adapterFor(normalizedModelName);
		assert(`You tried to load a queryMultipleObject but your ${modelName} adapter does not implement 'queryMultipleObject'`, typeof adapter.queryMultipleObject === 'function');
		return promiseArray(
			_queryMultipleObject(url,
				adapter,
				this,
				normalizedModelName,
				jsonObject,
				undefined));
	},

	transaction(url, modelName, jsonObject) {
		let normalizedModelName = normalizeModelName(modelName);
		let adapter = this.adapterFor(normalizedModelName);
		assert(`you must implement 'transaction' in your ${modelName} Adapter`, typeof adapter.transaction === 'function');
		return promiseObject(
			_transaction(url,
				adapter,
				this,
				modelName,
				jsonObject)
			.then(internalModel => {
				if (internalModel) {
					return internalModel.getRecord();
				}
				return null;
			}));
	},

	object2JsonApi(modelName, modelObj) {
		function relationshipIsNull(o) {
			let relationshipsObject = modelObj._internalModel.__relationships.initializedRelationships
			if (Object.keys(relationshipsObject).length === 0) {
				return { status: false, value: null, keys: []}
			} else {
				return { status: true, value: relationshipsObject, keys: Object.keys(relationshipsObject)}
			}
		}
		function relationshipDataIsNull(value) {
			return Object.keys(value).length === 0 ? false : true
		}
		function belongsToType(value) {
			return value.kind === 'belongsTo'
		}
		function hasManyType(value) {
			return value.kind === 'hasMany'
		}

		let number = 0;
		let json = modelObj.serialize();
		json.data.id = modelObj.get('id') || "-1";

		let rsps = relationshipIsNull(modelObj)

		if (rsps.status) {
			json.data.relationships = {};
			json.included = [];
			let rdata = null;
			rsps.keys.forEach((elem) => {
				if (belongsToType(rsps.value[elem])) {
					let attributes = modelObj[elem].serialize().data.attributes
					let type = modelObj[elem].serialize().data.type
					rdata = json.data.relationships[elem] = {};
					rdata.data = {
						id: modelObj[elem].get('id') || index,
						type
					};
					json.included.push({
						id: modelObj[elem].get('id') || index,
						type,
						attributes
					})
				} else if (hasManyType(rsps.value[elem])) {
					if(relationshipDataIsNull(rsps.value[elem])) {
						modelObj[elem].forEach((ele, index) => {
							if (index === 0 ) {
								rdata = json.data.relationships[elem] = {};
								rdata.data = [];
							}
							let attributes = ele.serialize().data.attributes
							let type = ele.serialize().data.type
							rdata.data.push({
								id: ele.get('id') || index,
								type
							})
							json.included.push({
								id: ele.get('id') || index,
								type,
								attributes
							})
						})
					}
				}
			})
		} else {
			return json;
		}
		return json;
	}

});
