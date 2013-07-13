define( function( require ) {

	'use strict';

	var _ = require( 'underscore' ),
		Backbone = require( 'backbone' ),
		Section = require( 'section-model' );

	var collection = Backbone.Collection.extend({

		url: '/api',

		model: Section,

		initialize: function() {

		}

	});

	return collection;
});