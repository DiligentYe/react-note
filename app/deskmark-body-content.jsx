/**
 * 定义主体部分右侧内容容器
 */

import React, {Component, PropTypes} from 'react';
import ShowLayer from './deskmark-content-show';
import EditLayer from './deskmark-content-edit';

const propTypes = {
	data: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
};

class DeskmarkBodyContent extends Component {
	constructor(props){
		super(props);
	}

	render() {
		let {data, onSave, onCancel, onEdit, onDelete} = this.props;
		// 根据是否处于编辑状态，返回不同内容
		if(data.editing){
			return (
				/*	编辑子组件 */
				<EditLayer 
					onSave={onSave}
					onCancel={onCancel}
					data={data}
				/>
			);
		} else {
			return (
				/* 展示子组件 */
				<ShowLayer 
					data={data}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			);
		}
		
	}
};

DeskmarkBodyContent.propTypes = propTypes;

export default DeskmarkBodyContent;