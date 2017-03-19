/**
 * 文档主体定义
 */
import React, {PropTypes} from 'react';
import DeskmarkBodyList from './deskmark-body-list';
import DeskmarkBodyContent from './deskmark-body-content';

/* 规范传入的props的类型 */
const propTypes = {
	data: PropTypes.object.isRequired,
	onCreate: PropTypes.func.isRequired,
	onSelect: PropTypes.func.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
}

/* 由于DeskmarkBody中不涉及内部的state等，我们采用无状态函数式组件 */
function DeskmarkBody(items) {
	/* 使用ES6的解构，对局部定义变量进行赋值 */
	let {data, onCreate, onSelect, onSave, 
		onCancel, onEdit, onDelete} = items;
	return (
		<div className="deskmark-body container">
            <div className="row">
            	{/* 左侧日记列表 */}
				<DeskmarkBodyList 
					notes={data.notes} 
					onCreate={onCreate}
					onSelect={onSelect}
					
				/>
				{/* 右侧显示编辑面板 */}
				<DeskmarkBodyContent
					data={data}
					onSave={onSave}
					onCancel={onCancel}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			</div>
		</div>
	);
}

DeskmarkBody.propTypes = propTypes; 

export default DeskmarkBody;
