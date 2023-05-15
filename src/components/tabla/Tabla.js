/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Table } from "antd";
import React, { useContext, useEffect } from "react";
import "./style.css";
import { GlobalContext } from "../context/GlobalContext";

const TablaCli = () => {
  const URL = process.env.REACT_APP_URL;

  const { infoClientes, setInfoclientes, idUsu } =
    useContext(GlobalContext);

  //* EJECUTA LAS FUNCION QUE TRAE LA INFO y TRAE LOS DATOS PARA LLENAR TABLA CLIENTES

  useEffect(() => {
    if (idUsu) {
      const data = new FormData();
      data.append("idU", idUsu);
      fetch(`${URL}tablaClientes.php`, {
        method: "POST",
        body: data,
      }).then(function (response) {
        response.text().then((resp) => {
          const data = resp;
          const objetoData = JSON.parse(data);
          setInfoclientes(objetoData);
        });
      });
    }
  }, [idUsu]);


  console.log(infoClientes);


//   function traeClientes() {
//     const data = new FormData();
//     fetch(`${URL}tablaClientes.php`, {
//       method: "POST",
//       body: data,
//     }).then(function (response) {
//       response.text().then((resp) => {
//         const data = resp;
//         const objetoData = JSON.parse(data);
//         setInfoclientes(objetoData);
//       });
//     });
//   }

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
        <span onClick={() => handleCliente(record)}>{text}</span>
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

  const data = infoClientes.map((c, index) => ({
    cuenta: c.cli_idsistema,
    clientes: c.cli_nombre,
    zonas: c.gruuno_desc,
    centro: c.grudos_desc,
    propietario: c.usu_nombre,
    email: c.cli_email1,
    telefono: c.cli_telefono1,
  }));

    // const data = [
    //   {
    //     cuenta: "1",
    //     clientes: "Mike",
    //     zonas: "10 Downing Street",
    //     centro: "Mike",
    //     propietario: 32,
    //     email: "10 Downing Street",
    //     telefono: "10 Downing Street",

    //   },
    //   {
    //     cuenta: "2",
    //     clientes: "John",
    //     zonas: "10 Downing Street",
    //     centro: "John",
    //     propietario: 42,
    //     email: "10 Downing Street",
    //     telefono: "10 Downing Street",
    //   },
    // ];


    const handleCliente = (record) => {
        console.log("Cliente seleccionado: ", record);
        // Aquí puedes realizar las acciones que necesites con la información del cliente
      };



  return (
    <>
      <div className="div_wrapper">
        <h1 className="titulos">CLIENTES</h1>
        <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
        <Table dataSource={data} columns={columns} />
      </div>
    </>
  );
};

export default TablaCli;
