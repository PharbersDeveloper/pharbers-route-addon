import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
	init() {
		this._super(...arguments);
		console.info('login')
	},
	cookies: inject(),
	model() {
		{
			// Demo 1
			// let req = this.store.createRecord('request', {
			// 	id: '-1',
			// 	res: 'User',
			// 	fmcond: this.store.createRecord('fmcond', {
			// 		id: '-215',
			// 		skip: 10,
			// 		take: 20
			// 	})
			// });
			//
			// let eqValues = [
			// 	{type: 'eqcond', key: 'phone', val: '18510971868', category: 'home'},
			// 	{type: 'eqcond', key: 'name', val: 'Alex'},
			// 	{type: 'upcond', key: 'phone', val: '18994737968'}
			// ]
			//
			// eqValues.forEach((elem, index) => {
			// 	req.get(elem.type).pushObject(this.store.createRecord(elem.type, {
			// 		id: index,
			// 		key: elem.key,
			// 		val: elem.val,
			// 		category: elem.category || null
			// 	}))
			// })
			//
			// let result = this.store.object2JsonApi('request', req);
			// console.info(result)
		}

		{
			// Demo2
			// let result = this.store.createRecord('bmauth', {
			// 	id: "-1",
			// 	token: "fuck tokentokentokentoken",
			// 	phone: this.store.createRecord('bmphone', {
			// 		id: "-2",
			// 		phone: '10000000',
			// 	})
			// })
			//
			// let values = [
			// 	{name: "Alex", type: 'wechat', list: ['a', 'b', 'c']},
			// 	{name: "Alfred", type: 'wechat', list: ['e', 'd', 'f']}
			// ]
			//
			// values.forEach((elem, index) => {
			// 	result.get(elem.type).pushObject(this.store.createRecord("bm"+elem.type, {
			// 		id: index,
			// 		name: elem.name,
			// 		list: elem.list
			// 	}))
			// });
			//
			// let r = this.store.object2JsonApi('bmauth', result)
			// console.info(r)
		}

		// let result = this.store.peekAll('bmphone');
		// console.info(result)

	},
	actions: {
		test() {
			let req = this.store.createRecord('request', {
				id: '-1',
				res: 'User',
				fmcond: this.store.createRecord('fmcond', {
					id: '-215',
					skip: 10,
					take: 20
				})
			});

			let eqValues = [
				{type: 'eqcond', key: 'phone', val: '18510971868', category: 'home'},
				{type: 'eqcond', key: 'name', val: 'Alex'},
				{type: 'upcond', key: 'phone', val: '18994737968'}
			]

			eqValues.forEach((elem, index) => {
				req.get(elem.type).pushObject(this.store.createRecord(elem.type, {
					id: index,
					key: elem.key,
					val: elem.val,
					category: elem.category || null
				}))
			})

			let condition = this.store.object2JsonApi('request', req);
			console.info(condition)

			let result = this.store.queryObject('/api/bmphones', 'bmphone', condition);
			result.then(elem => {
				console.info(elem)
				localStorage.setItem('bmphone', elem)
				// this.transitionTo('hello')
			})
		}
	}
});
