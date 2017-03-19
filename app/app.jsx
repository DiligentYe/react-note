/**
 * 入口函数：将最外层的组件渲染到页面上
 */

/* 导入需要的包 */
import React from 'react';
import ReactDOM, {render} from 'react-dom';
import Deskmark from './deskmark';

/* 引入页面样式 */
require('../build/index.scss');

/* 定义DOM节点 */
var root = document.createElement('div');
root.className='wrapper';
document.body.appendChild(root);

/* 将组件渲染到真实的页面节点上 */
render(<Deskmark/>, root);


