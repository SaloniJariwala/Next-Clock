import React from "react";
import { Modal } from "antd";
import styles from "../../styles/Timer.module.css";
import Image from "next/image";
import ringTimer from "../../Assets/ringTimer.svg";
import HandStop from "../../Assets/handshak.svg";

function DisplayTimerModal({ timerModal, handleCloseRing, ringData }) {
  return (
    <Modal
      open={timerModal}
      title={null}
      footer={null}
      className={styles.ring_modal}
      width={"40%"}
      centered
    >
      <div className={styles.ring_Modal_Outer}>
        <Image src={ringTimer} alt="ring-logo" height={60} width={60} />
        <span className={styles.ring_Title}>{ringData?.title}</span>
        <button
          className={styles.btn_close}
          style={{ margin: "30px 0" }}
          onClick={handleCloseRing}
        >
          <Image src={HandStop} alt={"HandStop"} height={20} width={20} /> Stop
        </button>
      </div>
    </Modal>
  );
}

export default DisplayTimerModal;
