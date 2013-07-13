define( function( require ) {

	'use strict';

	var Backbone = require( 'backbone' );

	var model = Backbone.Model.extend({

		urlRoot: '/api',

		defaults: function() {
			return {
				id: null,
				title: 'Test title',
				subtitle: 'Test subtitle'
			};
		},

		initialize: function(){
		}
	});

	return model;
});