define( function( require ) {

    'use strict';

    var $ = require( 'jquery' ),
       _ = require( 'underscore' ),
       Backbone = require( 'backbone' ),
       PostCollection = require( 'post-collection' );

    var view = Backbone.View.extend({

        el: '.post',

        post: window.location.hash.substring(1),

        events: {
        },

        initialize: function() {
            var that = this;
            this.collection = new PostCollection();
            this.template = _.template(tpl.get('post'));
            //this.bind('reset', this.render, this);  
            this.collection.fetch().complete(function(){
                that.render();
            });

        },

        render: function() { 
            this.$el.html( this.template( this.collection.get(this.post).toJSON() ));
            return this.el

        }

    });

    return view;
});