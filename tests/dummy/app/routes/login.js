import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default Route.extend({
	cookies: inject(),
	model() {

        // let res = "BMPhone";
        // let inputs = [{id: "2", type: "eq_cond", key: "phone", val: "13720200891"}]
		//
        // let data = this.Data;
        // data.init()
        // data.set('attributes.res', res);
        // data.set('relationships.conditions', {data: [{id: '2', type: 'eq_cond'}]});
		//
        // let condition = this.Contact.joint(data, inputs)
		//
		// let that = this;
        // return this.store.queryObject('bmauth', condition).then(function(data){
		// 	that.get('cookies').write('token', data.token, { path: '/' });
		// 	return data
		// })


		// let values = [
		// 	{key: "name", val: "Alex", type: 'eq_cond'},
		// 	{key: "name", val: "Clock", type: 'eq_cond'},
		// 	{key: "name", val: "Alfred", type: 'eq_cond'},
		// 	{key: "phone", val: "18510971868", type: 'up_cond'}]
		//
		//
		// let result = this.store.createRecord('request', {
		// 	id: "-1",
		// 	res: "fuck",
		// 	fm_cond: this.store.createRecord('fm_cond', {
		// 		id: "-2",
		// 		take: 20,
		// 		skip: 2
		// 	})
		// })
		//
		// values.forEach((elem, index) => {
		// 	result.get(elem.type).pushObject(this.store.createRecord(elem.type, {
		// 		id: index,
		// 		key: elem.key,
		// 		val: elem.val
		// 	}))
		// });
		//
		// this.store.object2JsonApi('request', result)

		let result = this.store.createRecord('bmauth', {
			id: "-1",
			token: "fuck tokentokentokentoken",
			phone: this.store.createRecord('bmphone', {
				id: "-2",
				phone: '10000000',
			})
		})

		let values = [
			{name: "Alex", type: 'wechat'},
			{name: "Alfred", type: 'wechat'}]

		values.forEach((elem, index) => {
			result.get(elem.type).pushObject(this.store.createRecord("bm"+elem.type, {
				id: index,
				name: elem.name,
			}))
		});

		this.store.object2JsonApi('bmauth', result)

	},
	actions: {
		test() {
            // let model = this.modelFor('login');
            // let temp = model.save()

            // 查询
            // let res = "BMPhone";
            // let inputs = [{id: "2", type: "eq_cond", key: "phone", val: "13720200891"}, {id: "3", type: "location", title: "天庭", location: "000.000，000.000"}]
            //
            // let data1 = this.Data;
            // data1.init()
            // data1.set('attributes.res', res);
            // data1.set('relationships.conditions', {data: [{id: '2', type: 'eq_cond'}]});
            // data1.set('relationships.location', {data: [{id: '3', type: 'location'}]});
            //
            // let condition1 = this.Contact.joint(data1, inputs)
            // window.console.info(condition1)

            // 算是新增吧
            // let data2 = this.Data;
            // data2.init()
            // data2.set('attributes.name', 'Alex');
            // data2.set('attributes.age', 18);
            // data2.set('relationships.user', {data: [{id: '2', type: 'eq_cond'}]});
            //
            // let condition2 = this.Contact.joint(data2, [])
            // window.console.info(condition2)

		},

        insert() {
            let data = this.Data;
            data.init();
            data.set('type', 'Contact');
            data.set('attributes.name', 'Alex');
            data.set('attributes.phone', '18510971868');
            data.set('relationships.location', {data: {id: '10010', type: 'Location'}});
            data.set('relationships.orders', {data: [{id: '11112', type: 'Order'}, {id: '11113', type: 'Order'}]});

            let inputs = [
                {id: "10010", type: "Location", title: "中国", address: "北京", district: "通州"},
                {id: "11112", type: "Order", title: "啦啦啦"},
                {id: "11113", type: "Order", title: "叭叭叭"}
            ]
            let condition = this.Contact.joint(data, inputs)
            this.store.transaction('contact', condition)
        },
	}
});
