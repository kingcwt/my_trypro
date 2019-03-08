import React, { Component, Fragment } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import PageHeader from '../../components/PageHeader';
import {
  Card,
  Divider,
  Table,
  message,
  Modal,
  Form,
  Input,
  Button,
  Icon,
  Row,
  Col,
  Select,
  InputNumber,
  DatePicker,
} from 'antd';
import StandTable from '../../components/ChildTab/index';
import StandardTable from '../../components/StandardTable';
import * as user from '../../services/meth';
import { connect } from 'dva';
import styles from '../List/BasicList.less';
import Result from '@/components/Result';
const FormItem = Form.Item;

function timeTrans(date){
  date = new Date(Number(date));
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
  return Y+M+D+h+m+s;
}

@connect(({ admin,loading }) => {
  return(
    {
      admin:admin,
      loading: loading.models.admin,
    })
})
@Form.create()
export default class List extends Component{
  state={addVisible:false,visible:false,text:undefined,done:false};

  columns=[
    {
      title:'用户账号',
      dataIndex: 'username',
    },
    {
      title: '描述',
      dataIndex: 'desc',
    },
    {
      title:'类型',
      dataIndex:'scope',
    },
    {
      title:'创建时间',
      dataIndex:'createTime',
      render:(val)=>timeTrans(val)
    },
    {
      title: '操作',
      render: (text, record) => {
        return (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, text)}>编辑</a>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.handleDeleteID.bind(this,text._id)}>删除</a>
          </Fragment>
        )
      }
    },

  ];

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount(){
    const {dispatch}=this.props;

    dispatch({
      type:'admin/adminManagement'
    })
  }

  async handleUpdateModalVisible(visible,text){
    this.setState({visible,text,done:false});
  }

  async handleDeleteID(id){

    /*刪除*/

    const {dispatch,admin:{management_Data}}=this.props;

    const data=await user.management_RemoveFunc({id});

    data.statusCode===1?message.success(data.message,1.5,()=>{
      let data=management_Data.filter((val)=>val._id!==id);
      dispatch({
        type:"admin/success",
        payload:{
          management_Data:data
        }
      })
    }):message.error(data.message,1.5);
  }


   async handleSubmit(e){

     e.preventDefault();

    let _this=this;

   const {dispatch,admin:{management_Data}}=this.props;

   const {text:{_id}}=this.state;

   const fieldsName=this.refs.username.state.value;

   const fieldsDesc=this.refs.desc.state.value;

      const changeInfo=await user.management_EditFunc({_id,username:fieldsName,desc:fieldsDesc});

      changeInfo.statusCode===1?Begin():message.error(changeInfo.message,1.5);

      function Begin(){
        const oneData=management_Data.map((item)=>{
          if(item._id===_id){
            item.username=fieldsName;
            item.desc=fieldsDesc
          }
          return item;
        });
        management_Data.filter((i)=>i._id!==_id);
        management_Data.push(oneData);
        dispatch({
          type:'admin/success',
          payload:{
            management_Data
          }
        });
        _this.setState({done:true})
      }

  }
  addAdmin(){
    const {dispatch,form,admin:{management_Data}}=this.props;

    form.validateFields(async (err,fields)=>{
      if(err) return;

      const info=await user.regFunc({username:fields.username,pwd:fields.pwd,desc:fields.desc});

      info.statusCode===1?message.success(info.message,2,()=>{
        dispatch({
          type:'admin/adminManagement'
        });
      this.props.form.setFieldsValue({username:undefined,pwd:undefined,desc:undefined});

        this.setState({addVisible:false});
      }):message.error(info.message,1.5);
    })
  }

  async handleSearch(e){
  //搜索
const {dispatch,admin:{management_Data}}=this.props;
    e.preventDefault();
    const serData=await user.management_SearchFunc({username:this.refs.Search_name.state.value});
    serData.statusCode===1?message.success(serData.message,1.5,()=>{
      this.refs.Search_name.state.value=undefined;
      dispatch({
        type:'admin/success',
        payload:{management_Data:serData.data}
      });

    }):message.error(serData.message,1.5)
  }

  handleFormReset=()=>{
    const {dispatch}=this.props;

    dispatch({ type:'admin/adminManagement' })

  };
  render(){
    const {addVisible,visible,text={},done}=this.state;
    const {loading,admin:{management_Data},form:{getFieldDecorator}}=this.props;
    const getModalContent=()=>{
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={()=>this.setState({visible:false})}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form>
          <FormItem label='用户账号' {...this.formLayout}>
            <Input  ref='username' defaultValue={text.username} placeholder="请输入账户" />
          </FormItem>
          <FormItem label='用户描述' {...this.formLayout}>
            <Input  ref='desc' defaultValue={text.desc}  placeholder="请输入描述信息" />
          </FormItem>
        </Form>
      )
    };
    const AddModalContent=()=>{
      return (
        <Form  >
          <FormItem label='用户账号' {...this.formLayout}>
            {getFieldDecorator('username',{
              rules: [{ required: true, message: '请输入账户名称' }],
              initialValue: text.username,
            })(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入账户" />)}
          </FormItem>
          <FormItem label='用户密码' {...this.formLayout}>
            {getFieldDecorator('pwd',{
              rules: [{ required: true, message: '请输入密码' }],
              initialValue: text.pwd,
            })(<Input.Password
                        placeholder="请输入密码"
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />)}
          </FormItem>
          <FormItem label='描述信息' {...this.formLayout}>
            {getFieldDecorator('desc',{
              rules: [{ required: true, message: '请输入描述信息' }],
              initialValue: text.desc,
            })(<Input
              prefix={<Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入描述信息 " />)}
          </FormItem>
        </Form>
      )
    };

    const modalFooter = done
      ? { footer: null}
      : { okText: '保存', onOk: this.handleSubmit.bind(this)};

    return (
     <PageHeaderWrapper title='用户列表'>
       <Card bordered={false}>
         <Form onSubmit={this.handleSearch.bind(this)} layout="inline">
           <Row gutter={{ md: 16, lg: 24, xl: 48 }}>
             <Col md={12} sm={24}>
               <FormItem label="规则名称">
                <Input   style={{width:'25vw'}}  defaultValue={''} ref='Search_name' placeholder="请输入" />
               </FormItem>
             </Col>
             <Col md={12} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
             </Col>
           </Row>
         </Form>
         <Button icon="plus" type="primary"  style={{margin:"2.5vh 0"}}  onClick={() => this.setState({addVisible:true,text:{}})}>
           新建
         </Button>
         <StandTable
           loading={loading}
           columns={this.columns}
           data={management_Data}
         />
       </Card>
       <Modal
         title={`编辑信息`}
         className={styles.standardListForm}
         width={640}
         bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
         destroyOnClose
         visible={visible}
         keyboard
         onCancel={()=>this.setState({visible:false})}
         {...modalFooter}
       >
         {getModalContent()}
       </Modal>
       <Modal
       title={`添加用户`}
       visible={addVisible}
       keyboard
       onCancel={()=>this.setState({addVisible:false})}
       onOk={this.addAdmin.bind(this)}
       >
         {AddModalContent()}
       </Modal>
     </PageHeaderWrapper>
    )
  }
}
