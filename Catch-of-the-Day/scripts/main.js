var React =require('react');
var ReactDom = require('react-dom');

/*Store Picker
-this will let us make storepicker element to put anywhere in our page
*/

var StorePicker = React.createClass({
	//what html do you want to displat
	render : function() {
		return (
			<p>Hello</p>
		)
	}

});

ReactDom.render(<StorePicker/>, document.querySelector('#main'));