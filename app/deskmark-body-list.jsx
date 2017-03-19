/**
 * 定义左侧日记列表
 */
import React, {Component, PropTypes} from 'react';
import ListGroupList from './list-group-item';

const propTypes = {
	notes: PropTypes.array.isRequired,
	onCreate: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	onShow: PropTypes.func,
};

class DeskmarkBodyList extends Component{
	constructor(...args){
		super(...args);
	}

	render() {
		let {notes, onCreate, onSelect, onShow} = this.props;
			return (
				<div className="col-xs-3 deskmark-list ">
	                    <div className="list-group list-sidebar">
	                    	<ListGroupList 
	                    		title="＋新建文档" 
	                    		isCreate={true} 
	                    		onCreate={onCreate}
	                    		onShow={onShow}
								onSelect={onSelect}
	                    	/>
	                    	{
								notes.map((note) => {
									return (
										<ListGroupList 
											title={note.title}
											id={note.id}
											key={note.id}
											onCreate={onCreate}
											onSelect={onSelect}
										/>
									);
								})                   		
	                    	}
	                    </div>
	            </div>
			);
	}
};

DeskmarkBodyList.propTypes = propTypes;

export default DeskmarkBodyList;