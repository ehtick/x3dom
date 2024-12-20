/** @namespace x3dom.nodeTypes */
/*
 * X3DOM JavaScript Library
 * http://www.x3dom.org
 *
 * (C)2009 Fraunhofer IGD, Darmstadt, Germany
 * Dual licensed under the MIT and GPL
 */

/* ### X3DMaterialNode ### */
x3dom.registerNodeType(
    "X3DMaterialNode",
    "Shape",
    defineClass( x3dom.nodeTypes.X3DAppearanceChildNode,

        /**
         * Constructor for X3DMaterialNode
         * @constructs x3dom.nodeTypes.X3DMaterialNode
         * @x3d 3.3
         * @component Shape
         * @status full
         * @extends x3dom.nodeTypes.X3DAppearanceChildNode
         * @param {Object} [ctx=null] - context object, containing initial settings like namespace
         * @classdesc This is the base node type for all Material nodes.
         */
        function ( ctx )
        {
            x3dom.nodeTypes.X3DMaterialNode.superClass.call( this, ctx );
        },
        {
            _fieldChanged : function ( fieldName, fields )
            {
                if ( fields.indexOf( fieldName ) > -1 )
                {
                    this._parentNodes.forEach( function ( app )
                    {
                        app._parentNodes.forEach( function ( shape )
                        {
                            if ( x3dom.isa( shape, x3dom.nodeTypes.X3DShapeNode ) )
                            {
                                shape._dirty.material = true;
                            }
                        } );
                        if ( x3dom.isa( app, x3dom.nodeTypes.X3DAppearanceNode ) )
                        {
                            app.checkSortType();
                        }
                    } );
                }
            }
        }
    )
);
