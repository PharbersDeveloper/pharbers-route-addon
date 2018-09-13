import Route from '@ember/routing/route';

export default Route.extend({
    model(parameter) {
        // console.info(this.modelFor('hello'))
        // console.info(this.paramsFor('hello'))
        // console.info(parameter)
        // let parameters = {
        //     condition: {}
        // }
        // return this.store.queryObject('hello', {})
    },
    actions: {
        commit() {
            console.info(this.modelFor('hello'))
        }
    }
});
