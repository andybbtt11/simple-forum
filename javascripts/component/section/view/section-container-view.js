define( function( require ) {

    'use strict';

    var _ = require( 'underscore' ),
        $ = require( 'jquery' ),
        Backbone = require( 'backbone' ),
        SectionCollection = require( 'section-collection' ),
        SectionView = require( 'section-view' );

    var view = Backbone.View.extend({

        el: $( '.list' ),

        initialize: function() {
            var that = this;

            this.collection = new SectionCollection();

            if( this.collection.length === 0 ){
                this.collection.fetch({
                    success: function(){
                        that.render();
                    }
                });
            } else {
                this.render();
            }
            
        },

        render: function() {

            var that = this;

            _.each( this.collection.models, function( model ){
                var sectionView = new SectionView({ model: model });
                that.$el.append( sectionView.render() );
            }, this);

            return this;
        }

    });

    return view;
});