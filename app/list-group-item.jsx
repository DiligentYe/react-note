/**
 * 定义列表组件
 */
import React, {Component, PropTypes} from 'react';

const propTypes = {
	onCreate: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	title: PropTypes.string.isRequired,
	id: PropTypes.string,
	isCreate: PropTypes.bool
};

class ListGroupList extends Component {
	constructor(...args){
		super(...args);
	}

	render(){
		let {onCreate, onSelect, title, id, isCreate} = this.props;

		if(isCreate){
			return (
				<a href="#" className="list-group-item list-group-item-title" 
					onClick={onCreate}>{title}</a>
			);
		} else {
			return (
			 	<a href="#" className="list-group-item" onClick={()=>onSelect(id)} >{title}</a>
			);
		}
		
	}
}

ListGroupList.propTypes = propTypes;

export default ListGroupList;