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
	// adapter:'pharbers-adapter',
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

	// object2JsonApi(modelName, attributes, relationships) {
	// 	let data = {
	// 		id: "-1",
	// 		type: modelName,
	// 		attributes
	// 	};
	// 	let relationship = {
	// 		eq_cond: {
	// 			data: []
	// 		},
	// 		fm_cond: {
	// 			data: []
	// 		}
	// 	};
	// 	let include = [];
	//
	// 	if (Array.isArray(relationships)) {
	// 		relationships.forEach((elem, index) => {
	// 			switch (elem.type) {
	// 				case 'eq_cond':
	// 					relationship.eq_cond.data.push({
	// 						id: index,
	// 						type: 'eq_cond'
	// 					})
	// 					include.push({
	// 						id: index,
	// 						type: 'eq_cond',
	// 						attributes: {
	// 							key: elem.key,
	// 							val: elem.val
	// 						}
	// 					})
	// 					break;
	//
	// 				case 'up_cond':
	// 					break;
	//
	// 				case 'fm_cond':
	// 					break;
	// 				default: {}
	//
	// 			}
	// 		});
	// 	}
	// 	data.relationships = relationship
	// 	data.included = include
	// 	return data
	// }

	object2JsonApi(modelName, object) {
		let number = 0;
		let json = object.serialize();
		json.data.id = object.id || "-1";

		let relationships = json.data.relationships = {};
		let included = json.included = [];

		let deleteValueNil = function(o) {
			Object.keys(o).forEach(elem => {
				if(Object.keys(o[elem]).length === 0) {
					delete o[elem]
				}
			})
		}

		if(modelName === 'request') {
			let eq_cond = relationships.eq_cond = {};
			let up_cond = relationships.up_cond = {};
			let fm_cond = relationships.fm_cond = {};
			object.eq_cond.forEach((elem, index) => {
				if (index === 0) {
					eq_cond.data = [];
				}
				let attributes = elem.serialize().data.attributes
				let type = elem.serialize().data.type
				eq_cond.data.push({
					id: number.toString(),
					type: type
				});
				included.push({
					id: number.toString(),
					type: type,
					attributes: attributes
				});
				number++
			})
			object.up_cond.forEach((elem, index) => {
				if (index === 0) {
					up_cond.data = [];
				}
				let attributes = elem.serialize().data.attributes
				let type = elem.serialize().data.type
				up_cond.data.push({
					id: number.toString(),
					type: type
				});
				included.push({
					id: number.toString(),
					type: type,
					attributes: attributes
				});
				number++
			})

			let attributes = object.fm_cond.serialize().data.attributes
			let type = object.fm_cond.serialize().data.type
			fm_cond.data = {
				id: "-215",
				type
			}
			included.push({
				id: "-215",
				type: "fm_cond",
				attributes
			})
			deleteValueNil(json.data.relationships)
		} else {
			let keys = [];
			if(Object.keys(json.data.attributes)) {
				Object.keys(json.data.attributes).forEach((ele) => {
					keys = Object.keys(object.toJSON()).filter((elem) => {
						return elem !== ele
					})
				})
			} else {
				keys = Object.keys(object.toJSON())
			}
			keys.forEach((elem) => {
				let rep = relationships[elem] = {};
				rep.data = []
				try {
					object[elem].forEach((ele, index) => {
						let attributes = ele.serialize().data.attributes
						let type = ele.serialize().data.type
						rep.data.push({
							id: number.toString(),
							type
						})
						included.push({
							id: number.toString(),
							type,
							attributes
						})
						number++
					})
				} catch(e) {
					let attributes = object[elem].serialize().data.attributes
					let type = object[elem].serialize().data.type
					rep.data.push({
						id: number.toString(),
						type
					});

					included.push({
						id: number.toString(),
						type,
						attributes
					})
					number++
				}
			});

			Object.keys(json.data.relationships).forEach(elem => {
				console.info(json.data.relationships[elem].data.length)
				if(json.data.relationships[elem].data.length === 1) {
					json.data.relationships[elem].data =
					json.data.relationships[elem].data[0]
				}
			})
		}

		console.info(json)
	}

});
