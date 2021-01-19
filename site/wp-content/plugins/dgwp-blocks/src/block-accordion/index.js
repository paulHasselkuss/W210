// Import block dependencies and components
import classnames from 'classnames';
import Inspector from './components/inspector';
import Accordion from './components/accordion';
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
	accordionTitle: {
		type: 'array',
		selector: '.accordion-title',
		source: 'children',
	},
	accordionText: {
		type: 'array',
		selector: '.accordion-text',
		source: 'children',
	},
	accordionAlignment: {
		type: 'string',
	},
	accordionOpen: {
		type: 'boolean',
		default: false
	},
	accordionMarkerHidden: {
		type: 'boolean',
		default: false
	},
};

class GBAccordionBlock extends Component {

	render() {

		// Setup the attributes
		const { attributes: { accordionTitle, accordionText, accordionAlignment, accordionOpen, accordionMarkerHidden }, isSelected, className, setAttributes } = this.props;

		return [
			// Show the block alignment controls on focus
			<BlockControls key="controls">
				<AlignmentToolbar
					value={ accordionAlignment }
					onChange={ ( value ) => this.props.setAttributes( { accordionAlignment: value } ) }
				/>
			</BlockControls>,
			// Show the block controls on focus
			<Inspector
				{ ...this.props }
			/>,
			// Show the button markup in the editor
			<Accordion { ...this.props }>
				<RichText
					tagName="p"
					placeholder={ __( 'Accordion Title', 'dgwp-blocks' ) }
					value={ accordionTitle }
					className="accordion-title"
					onChange={ ( value ) => this.props.setAttributes( { accordionTitle: value } ) }
				/>

				<div className="accordion-text">
					<InnerBlocks />
				</div>
			</Accordion>
		];
	}
}

// Register the block
registerBlockType( 'formatting/accordion', {
	title: __( 'Accordion', 'dgwp-blocks' ),
	description: __( 'Add an accordion block with a title and text.', 'dgwp-blocks' ),
	icon: 'editor-ul',
	category: 'formatting',
	keywords: [
		__( 'accordion', 'dgwp-blocks' ),
		__( 'list', 'dgwp-blocks' ),
		__( 'dgwp', 'dgwp-blocks' ),
	],
	attributes: blockAttributes,

	// Render the block components
	edit: GBAccordionBlock,

	// Save the attributes and markup
	save: function( props ) {

		// Setup the attributes
		const { accordionTitle, accordionText, accordionAlignment, accordionOpen, accordionMarkerHidden } = props.attributes;

		var effectiveClassNames = "accordion-title" + ( accordionMarkerHidden ? " accordion-marker-hidden" : "");

		// Save the block markup for the front end
		return (
			<Accordion { ...props }>
				<details open={accordionOpen} className="accordion">
					<summary className={effectiveClassNames}>
						<RichText.Content
							value={ accordionTitle }
						/>
					</summary>
					<div className="accordion-text">
						<InnerBlocks.Content />
					</div>
				</details>
			</Accordion>
		);
	}
} );
