/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component } = wp.element;

// Import block components
const {
  InspectorControls,
  BlockDescription,
} = wp.editor;

// Import Inspector components
const {
	Toolbar,
	Button,
	PanelBody,
	PanelRow,
	RangeControl,
	ToggleControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { accordionTitle, accordionText, accordionOpen, accordionMarkerHidden } = this.props.attributes;

		return (
		<InspectorControls key="inspector">
			<PanelBody>

				<ToggleControl
					label={ __( 'Open by default', 'dgwp-blocks' ) }
					checked={ accordionOpen }
					onChange={ () => this.props.setAttributes( { accordionOpen: ! accordionOpen } ) }
				/>
			</PanelBody>
			<PanelBody>

				<ToggleControl
					label={ __( 'Marker hidden', 'dgwp-blocks' ) }
					checked={ accordionMarkerHidden }
					onChange={ () => this.props.setAttributes( { accordionMarkerHidden: ! accordionMarkerHidden } ) }
				/>
			</PanelBody>
		</InspectorControls>
		);
	}
}
