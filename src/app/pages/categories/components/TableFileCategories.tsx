import React, {useState,useEffect} from 'react'
import {Popconfirm} from 'antd'
import { TableList } from '../../../components'
import {CONFIG} from '../../../../helpers/config';
import { requestPOST_URL } from '../../../../helpers/baseAPI';
import ModalFileCategoryItem from './ModalFileCategoryItem';


const TableFileCategories = (props:any) => {
    const column = [
        {
            title: 'Tên',
            dataIndex: 'TenGiayTo',
            key: 'TenGiayTo'   
        },
        {
            title: 'Mã',
            dataIndex: 'MaGiayTo',
            key: 'MaGiayTo',
        },
        {
            title: 'Thao tác',
            dataIndex: '',
            key:'action',
            width:'10%',
            render:(text:string,record:any) =>{
                return(
                    <div>
                        <a
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
                            data-toggle='m-tooltip'
                            title='Xem chi tiết/Sửa'
                            onClick={() => {
                                handleItem(record);
                            }}
                            >
                            <i className='fa fa-eye'></i>
                        </a>
                    </div>
                )
            }
        }
    ]
    const [dataTable, setDataTable] = useState([{}]);
    const [detailItem, setDetailItem] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(()=>{
        getDataCategories();
    },[])
    const handleItem = (record: any)=>{
        if(record) {
            setDetailItem(record);
        }
        setModalVisible(!modalVisible);
    }
    const getDataCategories = ()=>{
        var url = `${CONFIG.BASE_HSDT_URL}/GetDanhSachGiayToTheoIDCongDan`;
        var Data = {
            idCongDan:"f4f98407-6170-4fe4-8a3c-ceacb394ad90"
        }
        requestPOST_URL(url,Data).then(res=>{
            if(res.error.code ==200){
                setDataTable(res.data);
            }
        })
      
    }
    return(<div>
        <TableList 
            dataTable = {dataTable}
            columns = {column}
            isPagination ={true}
        />
        {modalVisible && <ModalFileCategoryItem modalVisible= {modalVisible} setModalVisible= {setModalVisible} data={detailItem}/>}
    </div>)
}

export default TableFileCategories;