import React,{Component} from 'react';
import {Table} from 'antd';
export default class Notice extends Component{
  render(){
    const {rowKey,data=[],...props}=this.props;
    const isArray=(Object.prototype.toString.call(data)==='[object Array]');
    const isObject=(Object.prototype.toString.call(data)==='[object Object]');
    if(isArray){data.forEach((i,d)=>i['key']=d);}
    const status= isArray?{dataSource:data}:isObject?{dataSource:[{...data,key:'0'}]}:{dataSource:[]};
    return (
     <Table
       rowKey={rowKey || 'key'}
       {...props}
       {...status}
     >
     </Table>
    )
  }
}
