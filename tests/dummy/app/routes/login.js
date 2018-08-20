import Route from '@ember/routing/route';
import EmberObject from '@ember/object';


const Data = EmberObject.extend({
    id: "fuck",
    type: "request",
    attributes: {},
    relationships: {},
    init() {
        this._super(...arguments);
        this.set('relationships', {});
        this.set('attributes', {});
    },
    output() {
        return {
            data: {
                id: this.id,
                type: this.type,
                attributes: this.attributes,
                relationships: this.relationships
            },
            included: this.included
        }
    }
})

const Contact = EmberObject.extend({
    joint(data, inputs) {
        let recursive = function(object, data) {
            return object.map((elem) => {
                let o;
                try { o = data[elem].data }
                catch (e) { o = elem }
                if (Array.isArray(o)) {
                    return recursive(o, data);
                } else {
                    let f = inputs.find((elem) => {
                        return elem.id == o.id && elem.type == o.type
                    });
                    if(f) {
                        delete f.id
                        delete f.type
                    }
                    return {
                        id: o.id,
                        type: o.type,
                        attributes: f || null
                    }
                }
            });
        }
        let temp = data.output();
        let included = recursive(
                            Object.keys(temp.data.relationships),
                                        temp.data.relationships)
        data.set('included', included);
        return data.output()
    }
})

export default Route.extend({
	model() {

        let res = "BMPhone";
        let inputs = [{id: "2", type: "eq_cond", key: "phone", val: "13720200891"}]

        let data = Data.create();
        data.set('attributes.res', res);
        data.set('relationships.conditions', {data: [{id: '2', type: 'eq_cond'}]});

        let condition = Contact.create().joint(data, inputs)
        // window.console.info(condition)
        //
		// let condition = {
		// 	"data": {
		// 		"id": "1",
		// 		"type": "request",
		// 		"attributes": {
		// 			"res": "BMPhone"
		// 		},
		// 		"relationships": {
		// 			"conditions": {
		// 				"data": [{
		// 					"id": "2",
		// 					"type": "eq_cond"
		// 				}]
		// 			}
		// 		}
		// 	},
		// 	"included": [{
		// 		"id": "2",
		// 		"type": "eq_cond",
		// 		"attributes": {
		// 			"key": "phone",
		// 			"val": "13720200891"
		// 		}
		// 	}]
		// }
        return this.store.queryObject('bmauth', condition)
	},
	actions: {
		test() {
            // let model = this.modelFor('login');
            // let temp = model.save()

            // 查询
            // let res = "BMPhone";
            // let inputs = [{id: "2", type: "eq_cond", key: "phone", val: "13720200891"}, {id: "3", type: "location", title: "天庭", location: "000.000，000.000"}]
            //
            // let data = Data.create();
            // data.set('attributes.res', res);
            // data.set('relationships.conditions', {data: [{id: '2', type: 'eq_cond'}]});
            // data.set('relationships.location', {data: [{id: '3', type: 'location'}]});
            //
            // let condition = Contact.create().joint(data, inputs)
            // window.console.info(condition)

            // 算是新增吧
            let data = Data.create();
            data.set('attributes.name', 'Alex');
            data.set('attributes.age', 18);
            data.set('relationships.user', {data: [{id: '2', type: 'eq_cond'}]});

            let condition = Contact.create().joint(data, [])
            window.console.info(condition)

		}
	}
});
