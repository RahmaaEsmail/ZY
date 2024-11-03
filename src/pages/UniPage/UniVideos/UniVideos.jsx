import { render } from '@testing-library/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { days, pdfIcon } from '../../../assets/svgIcons';
import Toast from '../../../components/toast';
import CustomTable from '../../../components/table/index'

export default function UniVideos() {
  const [toast , setToast] = useState(false)
  const {lec_id , videos_id} = useParams();
  const [allLectures , setAllLectures] = useState([]);
  const [selectedLecture , setSelectedLecture] = useState("")
  const [allVideos , setAllVideos] = useState([]);
  const [rowData , setRowData] = useState({});
  const navigate = useNavigate();
   
  console.log(lec_id , videos_id)

  const columns = [
    {
      id:"id" ,
      title:"video_id",
      dataIndex:"video_id"
    },
    {
      id:"Video Title",
      title:"video_title",
      dataIndex:"video_title"
    },
    {
      id:"video_price",
      title:"video_price",
      dataIndex:"video_price"
    },
    {
      id:"Video Image",
      title:"video_image_link",
      dataIndex:"video_image_link",
      render :(text , row) => <img src={row?.video_image_link} style={{width:"100px",height:"100px",objectFit:"cover"}}/>
    },
    {
      id:"Video Description",
      title:"video_description",
      dataIndex:"video_description",
      render:(text , row) => <div className="actions-btns"><a href={row?.video_description} style={{margin:'auto'}} target='_blank'>{pdfIcon}</a></div>
    },
    {
      id:"Video Link",
      title:"video_link",
      dataIndex:"video_link",
      render : (text , row) => 
      <div className="actions-btns">

      <a  href={row?.video_link} target='_blank' className="open-btn c-pointer text-primary">
        <div className="tooltip">Videos</div>
        {days}
        </a>
      </div>
    },
    {
      id:"Actions",
      title:"Actions",
      render:(text , row) => <div>
        <button className='btn btn-primary' onClick={() => navigate(`/${row?.video_id}/videos/questions/`)}>Video Questions</button>
      </div>
    }
  ]

  function handleGetAllLectures() {
    const data_send = {
      lec_sub_id : +lec_id
    }
      axios.post(`https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/select_lectures.php`,data_send)
      .then(res => {
        if(res?.data) {
          console.log(res?.data)
          setSelectedLecture(res?.data?.find(item => item?.lec_id == videos_id)?.lec_videos_ids)
          setAllLectures(res?.data);
        }
      }).catch(e => console.log(e))
  }

  useEffect(() => {
    handleGetAllLectures();
  } , [])

  // useEffect(() => {
  //   const filteredData = allLectures?.find(item => item?.lec_id == videos_id);
  //   console.log(filteredData)
  //   setSelectedLecture(filteredData)
  // } , [videos_id , allLectures])

  useEffect(() => {
    console.log(selectedLecture)
    // if(sele)
  } , [selectedLecture])

  function handleGetAllVideos() {
    const data_send = {
      // ids:
      ids : selectedLecture
    }
    console.log(data_send)
    axios.post('https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/select_videos_lec.php',data_send)
    .then(res => {
      if(res?.data) {
        console.log(res?.data)
        setAllVideos(res?.data)
      }
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    handleGetAllVideos();
  } ,[selectedLecture])

  return (
    <div>
        <div className="tablePageHeader">
        <h1 className="pageTitle">الفيديوهات</h1>
        </div>
        
        <CustomTable columns={columns} dataSource={allVideos}/>
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
