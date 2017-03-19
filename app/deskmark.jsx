/* 引入相应的包 */
import React, { Component } from 'react';
import uuid from 'uuid'; // 用于产生独一无二的id
import DeskmarkHeader from './deskmark-header';
import DeskmarkBody from './deskmark-body';
import DeskmarkFooter from './deskmark-footer';

/* 使用ES6语法创建Deskmark组件 */
class Deskmark extends Component {
	/* 构造函数，必须调用super方法，继承父函数的属性方法 */
	constructor(...args){
		super(...args);
		this.state = {
			notes: [],
			selectId: null,
			editing: false,
			currentNote: null
		}

		/* 绑定this,后期调用函数修改数据是Deskmark中的数据 */
		this.onCreate = this.onCreate.bind(this);
		this.onSelect = this.onSelect.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	/**
	 * 组件加载完成后，读取本地中的notes数据
	 */
	componentDidMount(){
		/* 本地存储数据格式为：数组中每一个元素件间‘;’隔开
							对象中每隔属性间用‘@@’隔开
							属性中键值间用‘=>’隔开
		*/
		let data = localStorage.getItem('notes');
		let notesStrArr = data.split(';');
		let notes = [];
		notesStrArr.forEach(function (note) {
			let itemArr = note.split('@@');
			let obj = {};
			itemArr.splice(0, 1);
			for (let i = 0; i < itemArr.length; ++i){
				let [key, value] = itemArr[i].split('=>');
				obj[key] = value;
			}
			notes.push(obj);
		})

		if(!!notes){
			this.setState({
				notes: notes
			});
		}
	}

	

	/**
	 * 	每次组件更新后，将notes数据存放到本地
	 */
	componentDidUpdate(){
		let notes = this.state.notes;
		var arr=[];
		notes.forEach(function (note) {
			let str = 'app.jsx';
			for(let key in note){
				str += '@@' + key + '=>' + note[key];
			}
			arr.push(str);
		});
		
		localStorage.setItem('notes', arr.join(';'));
		
	}

	/**
	 * 新建日记
	 */
	onCreate(){
		this.setState({
			selectId: null,
			editing: true,
			currentNote: null
		})
	}

	/**
	 * 显示日记
	 * @param  {[string]} id [note唯一标识]
	 */
	onSelect(id){
		// console.log(id);
		let notes = this.state.notes;
		notes.forEach(note => {
			if(note.id == id){
				this.setState({
					selectId: id,
					editing: false,
					currentNote: note,
				});
			}
		})
	}

	/**
	 * 编辑页面发布日记
	 * @param  {object} note 存放一个日记对象
	 */
	onSave(note){
		// 新建／修改
		var isCreate = true;

		let notes = this.state.notes;
		if(!note.id){
			note.id = uuid.v4();
		} 
		note.time = new Date().getTime();
		notes.forEach((item, index) => {
			if(item.id == note.id){
				notes[index] = note;
				isCreate = false;
			}
		});
		if(isCreate){
			notes = [...notes, note];
		}
		this.setState({
			notes: notes,
			editing: false,
			currentNote: note,
			selectId: note.id
		});
	}

	/**
	 * 编辑页面取消发布
	 */
	onCancel(){
		this.setState({
			editing: false
		});
	}

	/**
	 * 展示模式下，切换为编辑模式
	 * @param  {object} note 当前显示的笔记对象
	 */
	onEdit(note){
		this.setState({
			editing: true
		});
	}

	/**
	 * 删除当前展示的日记对象	
	 * @param  {sting} id 笔记对象唯一标识
	 */
	onDelete(id){
		let notes = this.state.notes;
		notes.forEach((note, index) => {
			if(note.id == id){
				notes.splice(index, 1);
				console.log('ok');
				this.setState({
					notes: notes,
					selectId: null,
					currentNote: null,
				});
			}
		})
	}

	/* 每一个组件必须有一个render函数，返回JSX */
	render(){
		return (
			<div className="deskmark-note">
				{/* 文档头 */}
				<DeskmarkHeader head="Deskmark" subhead="Record Your Life" />
				{/* 文档主体 */}
				<DeskmarkBody
					data={this.state}
					onCreate={this.onCreate}
					onSelect={this.onSelect}
					onSave={this.onSave}
					onCancel={this.onCancel}
					onEdit={this.onEdit}
					onDelete={this.onDelete}
					/>
				{/* 文档尾 */}
				<DeskmarkFooter />
			</div>
		);
	}
	
};

/* 采用ES6导出方法 */
export default Deskmark;