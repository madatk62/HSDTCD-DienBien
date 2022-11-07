import React, {useState,useEffect} from 'react';
import { Modal,Button } from 'react-bootstrap-v5';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import clsx from 'clsx';
import { Upload } from 'antd';
import { toast } from 'react-toastify';
const {Dragger} = Upload
const maxUploadSize = 3000000;
var initValue = {
    MaGiayTo: "",
    TenGiayTo: "",
    UrlFile : "",
    LoaiGiayToID : "",
    NhomGiayToCongDanID: "",
    LoaiGiayToCongDanID: "",
    SoGiayTo: null,
    NguonGui: "DinhKem"

}
const GiayToSchema = yup.object().shape({
    MaGiayTo: yup.string().trim().required("Mã giấy tờ là bắt buộc"),
    TenGiayTo: yup.string().trim().required("Tên giấy tờ là bắt buộc"),
    UrlFile : yup.string(),
    SoGiayTo: yup.number().typeError("Số giấy tờ không hợp lệ"),
    LoaiGiayToID : yup.string(),
    NhomGiayToCongDanID: yup.string(),
    LoaiGiayToCongDanID: yup.string(),
    NguonGui: yup.string()
})
const ModalFileCategoryItem = (props: any) =>{
    const [isLoading, setIsLoading] = useState(false);
    const [fileUpload, setFileUpload] = useState([]);
    const handleSubmitForm = ()=>{
      var a = formik.handleSubmit();
    }
    const handleClose = () => props.setModalVisible(false);
    const handleShow = () => props.setModalVisible(true);
    const formik = useFormik({
        initialValues: initValue,
        validationSchema: GiayToSchema, 
        onSubmit: (values, {setStatus,setSubmitting})=>{
            setSubmitting(true);
            setIsLoading(true);
            setTimeout(()=>{
                setIsLoading(false);
            },1000)
            
        },
        onReset: (values, {setStatus, setSubmitting,setValues})=>{
            setValues(props.data);
        }
    })
    // init file Upload 
    const uploads = {
        onRemove : (file: any) =>{
            
            
        },
        beforeUpload: (file:any)=> {
            
            setFileUpload((tmp:any) : any=>{
                var totalSize = file.size;
                tmp.map((item:any)=>{
                    totalSize += item.size;
                })
                console.log(totalSize);
                if(totalSize >= maxUploadSize) {
                    toast.warning("Đính kèm vượt quá giới hạn cho phép");
                    return [...tmp];
                }
                formik.setValues((tmp:any):any=>{
                    return [...tmp];
                })
                return [...tmp,file];
            })
            
        },
        name: 'file',
        multiple: true,
        fileList: fileUpload
    }
    useEffect(()=>{
        formik.setValues(props.data);
    },[])
    return(
    <form  className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
    noValidate
    id="file_category_detail_form"
    onSubmit={formik.handleSubmit}
    >
        <Modal
            fullscreen={'lg-down'}
            size='xl'
            onExited={handleClose}
            keyboard={true}
            scrollable={true}
            onEscapeKeyDown={handleClose}
            show = {props.modalVisible}
            backdrop="static"
        >
            <Modal.Header className='bg-primary px-4 py-3'>
            <Modal.Title className='text-white'>Chi tiết</Modal.Title>
                <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleClose}></button>
            </Modal.Header>
            <Modal.Body>
                <div className='row fv-row mb-7'>
                    <div className='col-xl-6 col-lg-6 col-md-6'>
                        <label className='form-label fw-bolder text-dark fs-6 required'>Mã giấy tờ</label>
                        <input 
                        placeholder='Mã giấy tờ'
                        type='text'
                        autoComplete = 'off'
                        {...formik.getFieldProps('MaGiayTo')}
                        className={clsx('form-control form-control-lg form-control-solid', 
                            {'is-invalid': formik.touched.MaGiayTo && formik.errors.MaGiayTo},
                            {
                            'is-valid': formik.touched.MaGiayTo && !formik.errors.MaGiayTo,
                            } )}

                        />
                        {
                        (formik.touched.MaGiayTo && formik.errors.MaGiayTo) &&
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>{formik.errors.MaGiayTo}</span>
                            </div>
                        </div>
                        }
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6'>
                        <label className='form-label fw-bolder text-dark fs-6'>Số giấy tờ</label>
                        <input 
                        placeholder='Số giấy tờ'
                        type='text'
                        autoComplete = 'off'
                        {...formik.getFieldProps('SoGiayTo')}
                        className={clsx('form-control form-control-lg form-control-solid', 
                            {'is-invalid': formik.touched.SoGiayTo && formik.errors.SoGiayTo},
                            {
                            'is-valid': formik.touched.SoGiayTo && !formik.errors.SoGiayTo,
                            } )}

                        />
                        {
                        (formik.touched.SoGiayTo && formik.errors.SoGiayTo) &&
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>{formik.errors.SoGiayTo}</span>
                            </div>
                        </div>
                        }
                    </div>    
                </div>
                <div className='row fv-row mb-7'>
                    <div className='col-xl-6 col-lg-6 col-md-6'>
                        <label className='form-label fw-bolder text-dark fs-6 required'>Tên giấy tờ</label>
                        <textarea 
                        placeholder='Tên giấy tờ'
                        rows={3}
                        autoComplete = 'off'
                        {...formik.getFieldProps('TenGiayTo')}
                        className={clsx('form-control form-control-lg form-control-solid', 
                            {'is-invalid': formik.touched.TenGiayTo && formik.errors.TenGiayTo},
                            {
                            'is-valid': formik.touched.TenGiayTo && !formik.errors.TenGiayTo,
                            } )}

                        />
                        {
                        (formik.touched.TenGiayTo && formik.errors.TenGiayTo) &&
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                            <span role='alert' className='text-danger'>{formik.errors.TenGiayTo}</span>
                            </div>
                        </div>
                        }
                    </div>
                
                </div>
                <div className='row fv-row mb-7'>
                    <div>  <label className='form-label fw-bolder text-dark fs-6 required'>Đính kèm</label></div>
                    <div>
                        <Dragger {...uploads} listType = "picture" >
                            <div>
                                <p className='ant-upload-text'>Thả tệp tin hoặc nhấp chuột để tải lên</p>
                                <p className='ant-upload-hint'>Đính kèm</p>
                            </div>
                        </Dragger>
                    </div>
                       
                    {
                    (formik.touched.UrlFile && formik.errors.UrlFile) &&
                    <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                        <span role='alert' className='text-danger'>{formik.errors.UrlFile}</span>
                        </div>
                    </div>
                    }   
                </div>
                    
               
            
            </Modal.Body>
            <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
                <div className='d-flex justify-content-center  align-items-center'>
                <Button className='btn-sm btn-primary rounded-1 p-2  ms-2' 
                  onClick={handleSubmitForm}
                  type='submit'
                  disabled = {formik.isSubmitting || !formik.isValid}
                  hidden = {formik.values.NguonGui=="DVC"?true:false}
                  >
                   { !isLoading?<span>
                        <i className='fa fa-save'></i>
                        Tạo mới
                    </span>
                    :<span className='indicator-progress' style={{display: 'block'}}>
                        Đang tạo mới...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>}
                   
                </Button>
                </div>
                <div className='d-flex justify-content-center  align-items-center'>
                <Button className='btn-sm btn-secondary rounded-1 p-2  ms-2' onClick={handleClose}>
                    <i className='fa fa-times'></i>Đóng
                </Button>
                </div>
        </Modal.Footer>
        </Modal>
        </form>)
}
export default ModalFileCategoryItem;