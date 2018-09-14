import Route from '@ember/routing/route';

export default Route.extend({
	init() {
		this._super(...arguments);
        console.info(localStorage.getItem('bmphone'))
		console.info('application')
	},
	model() {

	}

});
