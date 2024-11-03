import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Toast from '../../../components/toast';
import CustomTable from '../../../components/table/index';

export default function Lectures() {
    const [toast , setToast] = useState(false)
    const navigate = useNavigate();
    const {lect_id} = useParams();
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
        id:"Lecture Price",
        title:"lecture_price",
        dataIndex:"lecture_price"
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
              <button className='btn btn-success' onClick={() => navigate(`/${row?.lec_id}/lectures/questions/`)}>Lecture Questions</button>
              <button className='btn btn-primary' onClick={() => navigate(`/${lect_id}/${row?.lec_id}/videos/`)}>Videos</button>
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

    useEffect(() => {
        handleGetAllLectures()
    } ,[])

  return (
    <div>
       <div className="tablePageHeader">
        <h1 className="pageTitle">المحاضرات</h1>
        {/* <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add University
        </button> */}
      </div>
      <CustomTable columns={columns} dataSource={allLectures}/>
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
