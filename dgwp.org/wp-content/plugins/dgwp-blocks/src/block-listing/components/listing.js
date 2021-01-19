/**
 * Listing Wrapper
 */

// Setup the block
const { Component } = wp.element;

// Import block dependencies and components
import classnames from 'classnames';

/**
 * Create a Accordion wrapper Component
 */
export default class Listing extends Component {

	constructor( props ) {
		super( ...arguments );
	}

	render() {

		// Setup the attributes
		const { listingitle, listingText, listingAlignment } = this.props.attributes;

		return (	
			<section
				className={ classnames(
					this.props.className,
					listingAlignment,
					'block-listing',
				) }
			>
				{ this.props.children }
			</section>
		);
	}
}
