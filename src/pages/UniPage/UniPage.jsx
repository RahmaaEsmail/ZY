import { useEffect, useState } from "react";
import AddUniversity from "../../components/university/add/AddUniversity";
import axios from "axios";
import CustomTable from '../../components/table/index'
import { useNavigate } from "react-router-dom";
import Toast from "../../components/toast";

export default function UniPage() {
  const [toast, setToast] = useState(false);
    const [openModal , setOpenModal] = useState(false)
    const [allUniversity , setAllUniversity] = useState([]);
    const navigate = useNavigate();

    const columns = [
      {
        id :"id",
        title:"generation_id",
        dataIndex:"generation_id"
      },
      {
        id:"Name",
        title:"generation_name",
        dataIndex:"generation_name"
      },
      {
        id:"",
        title:"Actions",
        dataIndex:"Actions",
        render :(text , row) => {
          return (
            <div>
              <button className="btn btn-primary" onClick={() => navigate(`${row?.generation_id}/subjects`)}>Subjects</button>
            </div>
          )
        }
      }
    ]

    function handleGetAllUni() {
      axios.post(`https://camp-coding.tech/teachersApp2024/zy_medicine/doctor/home/select_generations.php`)
      .then(res => {
        if(res.data.status =="success") {
          setAllUniversity(res.data.message) 
        }
        else {
          setToast({
            show: true,
            type:"error",
            message: "حدث خطأ ما من فضلك حاول مره اخرى",
          });
        }
      })
    }

    useEffect(() => {
      handleGetAllUni()
    } , [])
  return (
    <div className="uni_page">
        <div className="tablePageHeader">
        <h1 className="pageTitle">الجامعات</h1>
        <button
          className="btn btn-success"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Add University
        </button>
      </div>
      <CustomTable columns={columns} dataSource={allUniversity} />
      <AddUniversity openModal={openModal}  setOpenModal={setOpenModal}/>

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
