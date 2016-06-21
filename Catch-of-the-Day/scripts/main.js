var React =require('react');
var ReactDom = require('react-dom');


var App = React.createClass({
	render: function(){
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header />
				</div>
				<Order />
				<Inventory />
			</div>
		)
	}
})

/*Header*/
var Header = React.createClass ({
	render :function(){
		return(
			<p>Header</p>
		)
	}
});
/*Order*/
var Order = React.createClass ({
	render :function(){
		return(
			<p>Order</p>
		)
	}
});
/*Inventory*/
var Inventory = React.createClass ({
	render :function(){
		return(
			<p>Inventory</p>
		)
	}
});

/*Store Picker*/
var StorePicker = React.createClass({
	//what html do you want to displat
	render : function() {
		return (
			<form className="store-selector">
				<h2> please enter a store </h2>
				<input type="text" ref="storeId"/>
				<input type="submit"/>
			</form>
		)
	}

});

ReactDom.render(<App/>, document.querySelector('#main'));