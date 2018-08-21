import EmberObject from '@ember/object';

export function initialize(application) {

    const flattenArray = EmberObject.create({
        flatten(arr) {
            while (arr.some(item => Array.isArray(item))) {
                arr = [].concat(...arr);
            }
            return arr;
        }
    });

    const Data = EmberObject.extend({
        id: "-1",
        type: "request",
        attributes: {},
        relationships: {},
        init() {
            this._super(...arguments);
            window.console.info('fuck')
            this.set('relationships', {});
            this.set('attributes', {});
            this.set('included', []);
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
                        if (f) {
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

            data.set('included', flattenArray.flatten(included));
            return data.output()
        }
    })

    application.register('Data:main', Data);
    application.register('Contact:main', Contact);
    application.register('flattenArray:main', flattenArray, { instantiate: false });

    application.inject('route', 'Data', 'Data:main');
    application.inject('component', 'Data', 'Data:main');
    application.inject('controller', 'Data', 'Data:main');
    application.inject('service', 'Data', 'Data:main');

    application.inject('route', 'Contact', 'Contact:main');
    application.inject('component', 'Contact', 'Contact:main');
    application.inject('controller', 'Contact', 'Contact:main');
    application.inject('service', 'Contact', 'Contact:main');

    application.inject('route', 'flattenArray', 'flattenArray:main');
    application.inject('component', 'flattenArray', 'flattenArray:main');
    application.inject('controller', 'flattenArray', 'flattenArray:main');
    application.inject('service', 'flattenArray', 'flattenArray:main');
}

export default { initialize };
