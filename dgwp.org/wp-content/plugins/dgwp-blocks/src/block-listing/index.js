// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Listing from './components/listing';
import omit from 'lodash/omit';

// Import CSS
import './styles/style.scss';
import './styles/editor.scss';

// Components
const { __ } = wp.i18n;

// Extend component
const { Component } = wp.element;

// Register block
const {
	registerBlockType,
	createBlock,
} = wp.blocks;

// Register editor components
const {
	RichText,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InnerBlocks,
} = wp.editor;

// Register components
const {
	Button,
	withFallbackStyles,
	IconButton,
	Dashicon,
} = wp.components;

const blockAttributes = {
	listingTitle: {
		type: 'array',
		selector: '.listing-title',
		source: 'children',
	},
	listingText: {
		type: 'array',
		selector: '.listing-text',
		source: 'children',
	},
	listingAlignment: {
		type: 'string',
	}
};

class GBListingBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { listingTitle, listingText, listingAlignment }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ listingAlignment }
					onChange={ ( value ) => this.props.setAttributes( { listingAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
//			<Inspector
//				{ ...this.props }
//			/>,
			// Show the button markup in the editor
			<Listing { ...this.props }>
				<RichText
					tagName="p"
					placeholder={ __( 'Listing Title', 'dgwp-blocks' ) }
					value={ listingTitle }
					className="listing-title"
					onChange={ ( value ) => this.props.setAttributes( { listingTitle: value } ) }
				/>

				<div className="listing-text">
					<InnerBlocks />
				</div>
			</Listing>
		];
	}
}

// Register the block
registerBlockType( 'formatting/listing', {
	title: __( 'Listing', 'dgwp-blocks' ),
	description: __( 'Adds a listing block', 'dgwp-blocks' ),
	icon: 'excerpt-view',
	category: 'formatting',
	keywords: [
		__( 'listing', 'dgwp-blocks' ),
		__( 'list', 'dgwp-blocks' ),
		__( 'dgwp', 'dgwp-blocks' ),
	],
	attributes: blockAttributes,

	// Render the block components
	edit: GBListingBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { listingTitle, listingText, listingAlignment } = props.attributes;

		// Save the block markup for the front end
		return (
			<Listing { ...props }>
			  <section class="listing">
					<header className="listing-title">
						<RichText.Content
							value={ listingTitle }
						/>
					</header>
					<div className="listing-text">
						<InnerBlocks.Content />
					</div>
				</section>
			</Listing>
		);
	}
} );
