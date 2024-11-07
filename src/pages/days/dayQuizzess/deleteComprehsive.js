import React, { useState } from "react";
import Modal from "../../../components/modal";
import Toast from "../../../components/toast";
import Loader from "../../../components/loader";
import { useParams } from "react-router-dom";

function DeleteComphersive({ questionId, openModal, setOpenModal, getFunction }) {
  const [loading, setLoading] = useState(false);
  const { pack, group, lecture, day } = useParams();

  const handleDelete = async () => {
    setLoading(true);

    try {
      const userData = JSON.parse(localStorage.getItem("moreenglishlogin"));
      const dataToSend = {
        attach_id: openModal,
        subject_id: lecture,
      };

      const response = await fetch(
        "https://camp-coding.tech/teachersApp2024/Mai_Magedy/admin/delete_question_attachment.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      const data = await response.json();
      if (data.status.trim() !== "error") {
        alert(data?.message);
        setOpenModal(false);
        getFunction(); // Refresh the questions list after deletion
      } else {
        // Handle error when deletion fails
        Toast.show({
          text: "An error occurred while deleting the question.",
          buttonText: "Retry",
          type: "danger",
          duration: 7000,
        });
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      Toast.show({
        text: "An error occurred while deleting the question.",
        buttonText: "Retry",
        type: "danger",
        duration: 7000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      close={() => setOpenModal(false)}
      footer={false}
      title={"Delete Question"}
      visible={openModal}
    >
      <div className="delete-confirmation">
        <p>Are you sure you want to delete this question?</p>
        <div className="modal-actions">
          <button
            onClick={handleDelete}
            className="confirm-btn"
            disabled={loading}
          >
            {loading ? <Loader /> : "Yes, Delete"}
          </button>
          <button
            onClick={() => setOpenModal(false)}
            className="cancel-btn"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteComphersive;
