import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Toast from '../../../components/toast';
import CustomTable from '../../../components/table/index';
import Modal from '../../../components/modal';

export default function Lectures() {
    const [toast , setToast] = useState(false)
    const navigate = useNavigate();
    const {sub_id ,lect_id} = useParams();
    const [openModal , setOpenModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [rowData , setRowData] = useState({});
    const [lectureData , setLectureData] = useState({
      lec_title:"",
      lec_descriprion:"",
      lec_arrangement:"",
      lecture_price:"",
    })
    const [allLectures , setAllLectures] = useState([]);
    const columns = [
      {
        id :"Lecture Id",
        title:"lec_id",
        dataIndex:"lec_id"
      },
      {
        id:"Lecture Title",
        title:"lec_title",
        dataIndex:"lec_title"
      },
      {
        id:"Lecture Description",
        title:"lec_descriprion",
        dataIndex:"lec_descriprion"
      },
      {
        id:"Lecture Cover Link",
        title:"lec_cover_link",
        dataIndex:"lec_cover_link",
        render : (text , row) => <img src={row?.lec_cover_link} style={{width:"100px",height:"100px",objectFit:"cover"}}/>
      },
      {
        title:"Actions",
        dataIndex:"Actions",
        render : (text , row) => {
          console.log(row)
          return (
            <div className='d-flex gap-2'>
               <button className='btn btn-primary' onClick={() => {
                setRowData(row)
                setEditModal(true)
              }}>Edit</button>
              <button className='btn btn-success' onClick={() => navigate(`/${row?.lec_id}/lectures/questions/`)}>Lecture Questions</button>
              <button className='btn btn-primary' onClick={() => navigate(`/${sub_id}/${lect_id}/${row?.lec_id}/videos/`)}>Videos</button>
            </div>
          )
        }
      }
    ]

    function handleGetAllLectures() {
     
      const data_send = {
        lec_sub_id : +lect_id
      }
        axios.post(`https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/select_lectures.php`,data_send)
        .then(res => {
          if(res?.data) {
            setAllLectures(res?.data);
          }
        }).catch(e => console.log(e))
    }


    function handleAddLecture(e) {
      e.preventDefault();

      const data_send = {
        ...lectureData,
        lec_sub_id : +lect_id
      }

      axios.post(`https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/add_leceture.php` , data_send)
      .then(res => {
        if(res?.data == "success") {
          setToast({type:"success",message:"Lecture Uploaded successfully"})
          setOpenModal(false);
          setLectureData({
            lec_title:"",
      lec_descriprion:"",
      lec_arrangement:"",
      lecture_price:"",
          })
          handleGetAllLectures();
        }
      }).catch(e => console.log(e))
      .finally(() => setOpenModal(false))
    }

    function handleEditLecture(e){
      e.preventDefault()
      console.log(rowData)
      const data_send = {
        ...rowData,
        lecture_price: "",
      }
      axios.post("https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/edit_lec.php" ,
        data_send
      ).then(res => {
        if(res?.data == "success") {
          setToast({type:"success",message:"Lecture Updated successfully."})
          handleGetAllLectures();
          setRowData({});
          setEditModal(false);
        }
      }).catch(e => console.log(e))
      .finally(() => setEditModal(false))
    }

    useEffect(() => {
        handleGetAllLectures()
    } ,[])

  return (
    <div>
       <div className="tablePageHeader">
        <h1 className="pageTitle">المحاضرات</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add Lecture
        </button>
      </div>
      <CustomTable columns={columns} dataSource={allLectures}/>

      <Modal visible={editModal} close={setEditModal} title={"Edit Lecture"} footer={null}>
        <form onSubmit={handleEditLecture}>
           <div className='form-group'>
            <label className='form-label'>Lecture Number</label>
            <input className='form-input' onWheel={(e) => e.target.blur()} type='number' placeholder='Lecture Number' value={rowData?.lec_arrangement} onChange={(e) => setRowData({...rowData,lec_arrangement :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Name</label>
            <input className='form-input' type='text' placeholder='Lecture Name' value={rowData?.lec_title} onChange={(e) => setRowData({...rowData,lec_title :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Description</label>
            <textarea className='form-input'  placeholder='Lecture Description' value={rowData?.lec_descriprion} onChange={(e) => setRowData({...rowData,lec_descriprion :e.target.value})}/>
           </div>

           {/* <div className='form-group'>
            <label className='form-label'>Lecture Price</label>
            <input className='form-input' onWheel={(e) => e.target.blur()} type='number' placeholder='Lecture Price' value={rowData?.lecture_price} onChange={(e) => setRowData({...rowData,lecture_price :e.target.value})}/>
           </div> */}

           <button className='btn btn-primary'>Edit</button>
        </form>
      </Modal>

      <Modal visible={openModal} close={setOpenModal} footer={null} title="Add Lecture">
      <form onSubmit={handleAddLecture}>
           <div className='form-group'>
            <label className='form-label'>Lecture Number</label>
            <input className='form-input' onWheel={(e) => e.target.blur()} type='number' placeholder='Lecture Number' onChange={(e) => setLectureData({...lectureData,lec_arrangement :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Name</label>
            <input className='form-input' type='text' placeholder='Lecture Name' onChange={(e) => setLectureData({...lectureData,lec_title :e.target.value})}/>
           </div>

           <div className='form-group'>
            <label className='form-label'>Lecture Description</label>
            <textarea className='form-input'  placeholder='Lecture Description' onChange={(e) => setLectureData({...lectureData,lec_descriprion :e.target.value})}/>
           </div>

           {/* <div className='form-group'>
            <label className='form-label'>Lecture Price</label>
            <input className='form-input' onWheel={(e) => e.target.blur()} type='number' placeholder='Lecture Price' onChange={(e) => setLectureData({...lectureData,lecture_price :e.target.value})}/>
           </div> */}

           <button className='btn btn-primary'>Add</button>
        </form>
      </Modal>
      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          onClose={() => setToast(false)}
        />
      )} 
    </div>
  )
}
