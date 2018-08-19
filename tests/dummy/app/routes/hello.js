import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        // let parameters = {
        //     condition: {}
        // }
        return this.store.queryObject('hello', {})
    },
    actions: {
        commit() {
            let model = this.modelFor('hello')
            let temp = model.save()
            window.console.info(temp)
        }
    }
});
