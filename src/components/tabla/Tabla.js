/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider, Drawer, Input, Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { GlobalContext } from "../context/GlobalContext";
import { CloseOutlined, ControlOutlined } from "@ant-design/icons";

const TablaCli = () => {
  const URL = process.env.REACT_APP_URL;

  const { infoClientes, setInfoclientes, idUsu } = useContext(GlobalContext);

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isCambioT, setIsCambioT] = useState(false);

  //* EJECUTA LAS FUNCION QUE TRAE LA INFO y TRAE LOS DATOS PARA LLENAR TABLA CLIENTES

  useEffect(() => {
    if (idUsu) {
      setIsLoading(true); // Establecer isLoading en true antes de hacer la solicitud
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
          setIsLoading(false); // Establecer isLoading en false después de recibir la respuesta
        });
      });
    }
  }, []);

  //console.log(infoClientes);


  /*COLUMNA, DATOS Y FILTRADO PARA TABLA INICIAL*/

  const columns = [
    {
      title: "CUENTA",
      dataIndex: "cuenta",
      key: "cuenta",
      align: "center",
      width: "50px",
    },
    {
      title: "CLIENTES",
      dataIndex: "clientes",
      key: "clientes",
      align: "left",
      render: (text, record) => (
        <span style={{ color: "#00b33c" }}>{text}</span>
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

  const handleCliente = (record) => {
    setSelectedCliente(record);
    setIsDrawerVisible(true);
  };

  const filterData = (data) => {
    if (!infoClientes || searchValue === "") {
      return data;
    }
    return data.filter((item) => {
      return (
        item.clientes &&
        (item.clientes.toUpperCase().includes(searchValue.toUpperCase()) ||
          item.cuenta?.toString().includes(searchValue))
      );
    });
  };

  const data = filterData(
    infoClientes.map((c, index) => ({
      key: c.cli_id,
      cuenta: c.cli_idsistema,
      clientes: c.cli_nombre,
      zonas: c.gruuno_desc,
      centro: c.grudos_desc,
      propietario: c.usu_nombre,
      email: c.cli_email1,
      telefono: c.cli_telefono1,
    }))
  );

  /*COLUMNA, DATOS Y FILTRADO PARA TABLA CAMBIO*/

  //console.log(isCambioT)
  const handleCambio = (isCambioT) => {
    setIsCambioT(!isCambioT);
  };
  

  const columnsCambio = [
    {
      title: "CUENTA",
      dataIndex: "cuenta",
      key: "cuenta",
      align: "center",
      width: "50px",
    },
    {
      title: "CLIENTES",
      dataIndex: "clientes",
      key: "clientes",
      align: "left",
      render: (text, record) => (
        <span style={{ color: "#00b33c" }}>{text}</span>
      ),
    },
    {
      title: "Has. Totales",
      dataIndex: "hasTotales",
      key: "hasTotales",
      align: "center",
    },
    {
      title: "Has. Propias",
      dataIndex: "propias",
      key: "propias",
      align: "center",
    },
    {
      title: "Has. Alquiladas",
      dataIndex: "alquiladas",
      key: "alquiladas",
      align: "center",
    },
    {
      title: "Compra USD Insumos",
      dataIndex: "usdInsumo",
      key: "usdInsumo",
      align: "center",
    },
    {
      title: "TT Entregadas",
      dataIndex: "toneladasEntregadas",
      key: "toneladasEntregadas",
      align: "center",
    },
    {
      title: "Compra USD Estimado",
      dataIndex: "estimadoUSDInsumos",
      key: "estimadoUSD",
      align: "center",
    },
    {
      title: "TT Estimado",
      dataIndex: "estimadoToneladas",
      key: "estimadoToneladas",
      align: "center",
    },
    {
      title: "Neg. USD Abierto",
      dataIndex: "negUSDAbierto",
      key: "negUSDAbierto",
      align: "center",
    },
  ];

  // const dataCambio = filterData(
  //   infoClientes.map((c, index) => ({
  //     key: c.cli_id,
  //     cuenta: c.cli_idsistema,
  //     clientes: c.cli_nombre,
  //     hasTotales: c.has_totales ? (typeof c.has_totales === 'string' ? parseInt(c.has_totales).toFixed(0) : c.has_totales) : "-",
  //     usdInsumo: c.usdEntregados ? (typeof c.usdEntregados === 'string' ? parseInt(c.usdEntregados).toFixed(0) : c.usdEntregados) : "-",
  //     estimadoUSDInsumos:c.costoEstimado ? (typeof c.costoEstimado === 'string' ? parseInt(c.costoEstimado).toFixed(0) : c.costoEstimado) : "-",
  //     toneladasEntregadas: c.toneladasEntregadas ? (typeof c.toneladasEntregadas === 'string' ? parseInt(c.toneladasEntregadas).toFixed(0) : c.toneladasEntregadas) : "-",
  //     estimadoToneladas:c.toneladasEstimadas ? (typeof c.toneladasEstimadas === 'string' ? parseInt(c.toneladasEstimadas).toFixed(0) : c.toneladasEstimadas) : "-",
  //   }))
  // );

  const numberFormatOptions = {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  
  const dataCambio = filterData(
    infoClientes.map((c, index) => ({
      key: c.cli_id,
      cuenta: c.cli_idsistema,
      clientes: c.cli_nombre,
      propias:c.has_totales ? (typeof c.has_propias === 'string' ? parseInt(c.has_propias).toLocaleString(undefined, numberFormatOptions).replace(/,/g, '.') : c.has_propias) : "-",
      alquiladas:c.has_totales ? (typeof c.has_alquiladas === 'string' ? parseInt(c.has_alquiladas).toLocaleString(undefined, numberFormatOptions).replace(/,/g, '.') : c.has_alquiladas) : "-",
      hasTotales: c.has_totales ? (typeof c.has_totales === 'string' ? parseInt(c.has_totales).toLocaleString(undefined, numberFormatOptions).replace(/,/g, '.') : c.has_totales) : "-",
      usdInsumo: c.usdEntregados ? (typeof c.usdEntregados === 'string' ? parseInt(c.usdEntregados).toLocaleString(undefined, numberFormatOptions).replace(/,/g, '.') : c.usdEntregados) : "-",
      estimadoUSDInsumos: c.costoEstimado ? (typeof c.costoEstimado === 'string' ? parseInt(c.costoEstimado).toLocaleString(undefined, numberFormatOptions).replace(/,/g, '.') : c.costoEstimado) : "-",
      toneladasEntregadas: c.toneladasEntregadas ? (typeof c.toneladasEntregadas === 'string' ? parseInt(c.toneladasEntregadas).toLocaleString(undefined, numberFormatOptions).replace(/,/g, '.') : c.toneladasEntregadas) : "-",
      estimadoToneladas: c.toneladasEstimadas ? (typeof c.toneladasEstimadas === 'string' ? parseInt(c.toneladasEstimadas).toLocaleString(undefined, numberFormatOptions).replace(/,/g, '.') : c.toneladasEstimadas) : "-",
      negUSDAbierto:c.suma_neg_valor ? (typeof c.suma_neg_valor === 'string' ? parseInt(c.suma_neg_valor).toLocaleString(undefined, numberFormatOptions).replace(/,/g, '.') : c.suma_neg_valor) : "-",
    }))
  );
  
  
  
  


  return (
    <>
      <div className="div_wrapper">
        <h1 className="titulos">CLIENTES</h1>
        <Divider style={{ marginBottom: "10px", marginTop: "0px" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "10px",
            width: "100%",
          }}
        >
          <Button
            className="btnCambio"
            icon={
              <ControlOutlined style={{ color: "#00b33c", fontSize: "20px" }} />
            }
            onClick={() => handleCambio(isCambioT)}
          ></Button>
          <Input
            style={{ width: "200px" }}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar por cliente o cuenta"
          />
          {/*
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Input
              style={{ width: "200px" }}
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Buscar por cliente o cuenta"
            />
          </div> */}
        </div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10%",
            }}
          >
            <Spin size="large" />
          </div>
        ) : (
          isCambioT ?(
            <Table
              dataSource={dataCambio}
              columns={columnsCambio}
              size="middle"
              onRow={(record) => ({
                onClick: () => handleCliente(record),
              })}
            />
            
          ):(
            <Table
              dataSource={data}
              columns={columns}
              size="middle"
              onRow={(record) => ({
                onClick: () => handleCliente(record),
              })}
            />
          )
        )}
      </div>
      {selectedCliente && (
        <Drawer
          visible={isDrawerVisible}
          onClose={() => setIsDrawerVisible(false)}
          title={selectedCliente.clientes}
          placement="bottom"
          height={"95vh"}
          style={{ whiteSpace: "nowrap" }}
          closeIcon={
            <CloseOutlined
              style={{ position: "absolute", top: "18px", right: "10px" }}
            />
          }
        >
          {/* Agrega iframe */}
          <p>AGREGAR IFRAME MODULO VIEWCLIENT</p>
        </Drawer>
      )}
    </>
  );
};

export default TablaCli;
