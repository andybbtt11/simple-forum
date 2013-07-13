define( function( require ) {

    'use strict';

    var $ = require( 'jquery' ),
       _ = require( 'underscore' ),
       Backbone = require( 'backbone' );

    var view = Backbone.View.extend({

        tagName: 'div',

        events: {
        },

        initialize: function() {
            this.template = _.template(tpl.get('section-item'));
            this.bind('reset', this.render, this);  
        },

        render: function() { 
            this.$el.html( this.template( this.model.toJSON() ));
            return this.el
        }

    });

    return view;
});