var React =require('react');
var ReactDom = require('react-dom');
/*ReactRouter*/
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Navigation = ReactRouter.Navigation;//mixin
var History = ReactRouter.History;//Mixin
/*seperate module npm install history*/
var createBrowserHistory = require('history/lib/createBrowserHistory');
/*require sibling helpers.js*/
var h = require('./helpers');







/******************************************** App */
/*State will live in App */
var App = React.createClass({
	//Get Intial State
	getInitialState : function(){
		return{
			fishes:{},
			orders:{}
		}
	},
	//Set State change add Fish
	addFish : function(fish){
		//give it unique key with timestamp
		var timestamp=(new Date()).getTime();
		//updatestate
		this.state.fishes['fish-' + timestamp] = fish;
		//setState what has changed
		this.setState({
			fishes :this.state.fishes
		});
	},	
	loadSamples : function(){
		this.setState({
			fishes : require ('./sample-fishes.js')
		});
	},
	renderFish : function(key){
		return <Fish key={key} index={key} details={this.state.fishes[key]}/>
	},
	//Render App 
	render: function(){
		return(
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market" />
					<ul className="list-of-fishes">
						{Object.keys(this.state.fishes).map(this.renderFish)}
					</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples}/>
			</div>
		)
	}
})

/******************************************** End of app */
/*Component-Fish*/
var Fish = React.createClass({
	render : function(){
		var details = this.props.details;
		var isAvailable = (details.status === 'available' ? true : false);
		var buttonText = (isAvailable ? 'Add To Order' : 'Sold Out!');
		return (
			<li className="menu-fish">			
				<img src={details.image} alt={details.name} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable}>{buttonText}</button>
			</li>	
		)
	}
});
/*Component-Add Fish Form*/
var AddFishForm = React.createClass({
	createFish : function(event){
		//1. stop form from submitting
		event.preventDefault();
		//2. Take the data from the form and create object where does this stuff come from (refs)
		//state is not actuall living in the AddFishForm it's living in App above because App handles all state
		var fish = {
			name: this.refs.name.value,
			price:this.refs.price.value,
			status:this.refs.status.value,
			desc:this.refs.desc.value,
			image:this.refs.image.value
		}
		//3. Add the fishto the app stata
			this.props.addFish(fish); /*this was passe down through props through inventory from App method addFish*/
			this.refs.fishForm.reset();//resets form refs
	},
	render: function(){
		return (
			<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
				<input type="text" ref="name" placeholder="Fish Name"/>
				<input type="text" ref="price" placeholder="Fish Price"/>
				<select ref="status">
					<option value="available">Fresh!</option>
					<option value="unavailable">Sold Out!</option>
				</select>
				<textarea type="text" ref="desc" placeholder="Desc"></textarea>
				<input type="text" ref="image" placeholder="URL to image"/>
				<button type="submit">+ Add Item</button>
			</form>
		)
	}
})
/*Component-Header*/
/*Has Props tagline:Fresh Seafood Market*/
var Header = React.createClass ({
	render :function(){
		return (
			<header className="top">
				<h1>Catch
				 	<span className="ofThe">
					 	<span className="of">of</span> 
					 	<span className="the">the</span>
					</span>
					Day 	
				 </h1>
				<h3 className="tagline"><span>{this.props.tagline}</span></h3>
			</header>
		)
	}
});

/*Component-Order*/
var Order = React.createClass ({
	render :function(){
		return(
			<p>Order</p>
		)
	}
});

/*Component-Inventory*/
var Inventory = React.createClass ({
	render :function(){
		return(
			<div>
				<h2>Inventory</h2>
				<AddFishForm {...this.props}/> {/*passes all of the props down from the Inventory coomponent to the AddFishForm component*/}
				<button onClick={this.props.loadSamples}> Load Sample Fishes</button> {/*Loads fishies from json file*/}
			</div>
		)
	}
});

/*Component-Store Picker*/
var StorePicker = React.createClass({
	mixins : [History],
	//what html do you want to displat
	goToStore : function(event){
		event.preventDefault();
		//get the data from the input
		var storeId = this.refs.storeId.value; /*this = component *storepicker* refs(see input refs)*/
		//transition from <storePicker/> to </App> and gives a fancy url
		this.history.pushState(null, '/store/' + storeId)		
	},
	render : function() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>{/*tell it to run a function. In this case the *this* refers to the actua storepicker component. storepicker.gotostore. */}
				<h2> please enter a store </h2>
				<input type="text" ref="storeId" defaultValue={h.getFunName()}/>{/*gets helper function from helpers.js*/}
				<input type="submit"/>
			</form>
		)
	}
});






/************************************* Routes*/
/*Component-Not Found*/
var NotFound = React.createClass({
	render : function(){
		return <h1>Not Found</h1>
	}
})
/* Routes -requires ReactRouter = determines the path it goes to */ 

/*Component-Routes*/
var routes=(
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker}/>
		<Route path="/store/:storeId" component={App}/>
	{/* pulls from component Not Found when url is not found as default*/}
		<Route path="*" component={NotFound}/>
 	</Router>
)





ReactDom.render(routes, document.querySelector('#main'));