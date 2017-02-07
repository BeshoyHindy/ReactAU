import React from 'react';

class Footer extends React.Component{
	constructor(props) {
		super(props);
		this.getActiveStyle = this.getActiveStyle.bind(this);
		this.getFooterStyle = this.getFooterStyle.bind(this);
		this.changeCurrent = this.changeCurrent.bind(this);
	}
	getActiveStyle(id){
		let s = {
			opacity: (id === this.props.currentId)?1:.5
		};
		return s;
	}
	getFooterStyle(){
		let s = {};
		if (!this.props.thumb){
			s.height = "30px";
		}
		return s;
	}
	changeCurrent(e){
		let id = parseInt(e.target.getAttribute("data-id"));
		this.props.setCurrent(id);
	}
	render(){
		let footerClass= "carousel-dot";
		return (
			<div className="carousel-footer" style={this.getFooterStyle()}>
				<div className="box">
				{
					Array.apply(null, {length: this.props.dots}).map( (item,id) => (<div className={footerClass} key={id} data-id={id} style={this.getActiveStyle(id)} onClick={this.changeCurrent} />))
				}
				</div>
			</div>
		);
	}
}
Footer.propTypes = {
	dots: React.PropTypes.number.isRequired,
	currentId: React.PropTypes.number.isRequired,
	setCurrent: React.PropTypes.func.isRequired,
	thumb: React.PropTypes.bool.isRequired
};

export {Footer};
