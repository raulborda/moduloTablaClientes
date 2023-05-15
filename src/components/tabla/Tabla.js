import { Divider, Table } from "antd";
import React from "react";
import "./style.css";

const TablaCli = () => {
  const columns = [
    {
      title: "CUENTA",
      dataIndex: "cuenta",
      key: "cuenta",
      align: "center",
    },
    {
      title: "CLIENTES",
      dataIndex: "clientes",
      key: "clientes",
      align: "center",
      render: (text, record) => (
        console.log("Cliente select: ", record)
      ),
    },
    {
      title: "ZONAS",
      dataIndex: "zonas",
      key: "zonas",
      align: "center",
    },
    {
      title: "CENTRO",
      dataIndex: "centro",
      key: "centro",
      align: "center",
    },
    {
      title: "PROPIETARIO",
      dataIndex: "propietario",
      key: "propietario",
      align: "center",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "TELEFONO",
      dataIndex: "telefono",
      key: "telefono",
      align: "center",
    },
  ];

  const dataSource = [
    {
      cuenta: "1",
      clientes: "Mike",
      zonas: "10 Downing Street",
      centro: "Mike",
      propietario: 32,
      email: "10 Downing Street",
      telefono: "10 Downing Street",
      
    },
    {
      cuenta: "2",
      clientes: "John",
      zonas: "10 Downing Street",
      centro: "John",
      propietario: 42,
      email: "10 Downing Street",
      telefono: "10 Downing Street",
    },
  ];

  return (
    <>
      <div className="div_wrapper">
        <h1 className="titulos">CLIENTES</h1>
        <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
        <Table dataSource={dataSource} columns={columns} />
      </div>
    </>
  );
};

export default TablaCli;
