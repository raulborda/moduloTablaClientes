/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Divider, Drawer, Input, Spin, Table, Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { GlobalContext } from "../context/GlobalContext";
import { CloseOutlined, ControlOutlined } from "@ant-design/icons";

const TablaCli = () => {
  const URLDOS = process.env.REACT_APP_URL;
  const PORT = window.location.port ? window.location.port : 80;
  const PROTOCOL = window.location.protocol;
  const HOSTNAME = window.location.hostname;
  const URL = `${PROTOCOL}//${HOSTNAME}:${PORT}`;
  const { infoClientes, setInfoclientes, idUsu } = useContext(GlobalContext);

  const { TabPane } = Tabs;

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  //const [isCambioT, setIsCambioT] = useState(false);
  const [cliSelect, setCliSelect] = useState(null);
  const [activeTab, setActiveTab] = useState("1");

  //* EJECUTA LAS FUNCION QUE TRAE LA INFO y TRAE LOS DATOS PARA LLENAR TABLA CLIENTES

  useEffect(() => {
    if (idUsu) {
      setIsLoading(true); // Establecer isLoading en true antes de hacer la solicitud
      const data = new FormData();
      data.append("idU", idUsu);
      fetch(`${URLDOS}tablaClientes.php`, {
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

  // console.log(infoClientes);

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
    setCliSelect(parseInt(record.key));
  };
  //console.log(selectedCliente);
  //console.log(cliSelect);

  localStorage.setItem("cliSelect", cliSelect);

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
  /*COLUMNA, DATOS Y FILTRADO PARA TABLA PRODUCTIVO*/

  //console.log(isCambioT)
  const handleCambio = (tabKey) => {
    setActiveTab(tabKey);
  };

  const columnsProductivo = [
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
      title: "HAS. TOTALES",
      dataIndex: "hasTotales",
      key: "hasTotales",
      align: "center",
    },
    {
      title: "HAS. PROP.",
      dataIndex: "propias",
      key: "propias",
      align: "center",
    },
    {
      title: "HAS. ALQ.",
      dataIndex: "alquiladas",
      key: "alquiladas",
      align: "center",
    },
    {
      title: "COMPRA USD INS.",
      dataIndex: "usdInsumo",
      key: "usdInsumo",
      align: "center",
    },
    {
      title: "TT ENTREG.",
      dataIndex: "toneladasEntregadas",
      key: "toneladasEntregadas",
      align: "center",
    },
    {
      title: "COMPRA USD ESTIM.",
      dataIndex: "estimadoUSDInsumos",
      key: "estimadoUSD",
      align: "center",
    },
    {
      title: "TT ESTIM.",
      dataIndex: "estimadoToneladas",
      key: "estimadoToneladas",
      align: "center",
    },
    {
      title: "NEG. USD ABIERTO",
      dataIndex: "negUSDAbierto",
      key: "negUSDAbierto",
      align: "center",
    },
    {
      title: "TAREAS ABIERTAS",
      dataIndex: "tareasAbiertas",
      key: "tareasAbiertas",
      align: "center",
    },
  ];

  // const dataProductivo = filterData(
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

  const dataProductivo = filterData(
    infoClientes.map((c, index) => ({
      key: c.cli_id,
      cuenta: c.cli_idsistema,
      clientes: c.cli_nombre,
      propias: c.has_propias
        ? typeof c.has_propias === "string"
          ? parseInt(c.has_propias)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_propias
        : "-",
      alquiladas: c.has_alquiladas
        ? typeof c.has_alquiladas === "string"
          ? parseInt(c.has_alquiladas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_alquiladas
        : "-",
      hasTotales: c.has_totales
        ? typeof c.has_totales === "string"
          ? parseInt(c.has_totales)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_totales
        : "-",
      usdInsumo: c.usdEntregados
        ? typeof c.usdEntregados === "string"
          ? parseInt(c.usdEntregados)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.usdEntregados
        : "-",
      estimadoUSDInsumos: c.costoEstimado
        ? typeof c.costoEstimado === "string"
          ? parseInt(c.costoEstimado)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.costoEstimado
        : "-",
      toneladasEntregadas: c.toneladasEntregadas
        ? typeof c.toneladasEntregadas === "string"
          ? parseInt(c.toneladasEntregadas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.toneladasEntregadas
        : "-",
      estimadoToneladas: c.toneladasEstimadas
        ? typeof c.toneladasEstimadas === "string"
          ? parseInt(c.toneladasEstimadas)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.toneladasEstimadas
        : "-",
      negUSDAbierto: c.suma_neg_valor
        ? typeof c.suma_neg_valor === "string"
          ? parseInt(c.suma_neg_valor)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.suma_neg_valor
        : "-",
      tareasAbiertas: c.cantidad_tareas_pendientes
        ? typeof c.cantidad_tareas_pendientes === "string"
          ? parseInt(c.cantidad_tareas_pendientes).toFixed(0)
          : c.cantidad_tareas_pendientes
        : "-",
    }))
  );



  /*COLUMNA, DATOS Y FILTRADO PARA TABLA RUBROS*/

  const columnsRubros = [
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
      title: "HAS. TOTALES",
      dataIndex: "hasTotales",
      key: "hasTotales",
      align: "center",
    },
    {
      title: "AGRICULTURA",
      dataIndex: "agricultura",
      key: "agricultura",
      align: "center",
    },
    {
      title: "GANADERIA",
      dataIndex: "ganaderia",
      key: "ganaderia",
      align: "center",
    },
    {
      title: "TAMBO",
      dataIndex: "tambo",
      key: "tambo",
      align: "center",
    },
    {
      title: "MIXTO",
      dataIndex: "mixto",
      key: "mixto",
      align: "center",
    }
  ];


  const dataRubros = filterData(
    infoClientes.map((c, index) => ({
      key: c.cli_id,
      cuenta: c.cli_idsistema,
      clientes: c.cli_nombre,
      hasTotales: c.has_totales
        ? typeof c.has_totales === "string"
          ? parseInt(c.has_totales)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.has_totales
        : "-",
        agricultura: c.Agricultura
        ? typeof c.Agricultura === "string"
          ? parseInt(c.Agricultura)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Agricultura
        : "-",
        ganaderia: c.Ganaderia
        ? typeof c.Ganaderia === "string"
          ? parseInt(c.Ganaderia)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Ganaderia
        : "-",
        tambo: c.Tambo
        ? typeof c.Tambo === "string"
          ? parseInt(c.Tambo)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Tambo
        : "-",
        mixto: c.Mixto
        ? typeof c.Mixto === "string"
          ? parseInt(c.Mixto)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Mixto
        : "-",
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
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Input
            style={{ width: "200px" }}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar por cliente o cuenta"
          />
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
          <Tabs activeKey={activeTab} onChange={handleCambio}>
            <>
              <Tabs.Tab key="1" tab="INFORMACIÓN">
                <Table
                  dataSource={data}
                  columns={columns}
                  size="middle"
                  onRow={(record) => ({
                    onClick: () => handleCliente(record),
                  })}
                />
              </Tabs.Tab>
              <Tabs.Tab key="2" tab="PRODUCTIVO">
                <Table
                  dataSource={dataProductivo}
                  columns={columnsProductivo}
                  size="middle"
                  onRow={(record) => ({
                    onClick: () => handleCliente(record),
                  })}
                />
              </Tabs.Tab>
              <Tabs.Tab key="3" tab="RUBROS">
                <Table
                  dataSource={dataRubros}
                  columns={columnsRubros}
                  size="middle"
                  onRow={(record) => ({
                    onClick: () => handleCliente(record),
                  })}
                />
              </Tabs.Tab>
            </>
          </Tabs>
        )}
      </div>
      {selectedCliente && (
        <Drawer
          visible={isDrawerVisible}
          onClose={() => setIsDrawerVisible(false)}
          title={selectedCliente.clientes}
          placement="bottom"
          height={"98vh"}
          style={{ whiteSpace: "nowrap" }}
          closeIcon={
            <CloseOutlined
              style={{ position: "absolute", top: "18px", right: "10px" }}
            />
          }
        >
          <iframe
            loading="lazy"
            src={`${URL}/tati/modulos/vista_cliente/?idC=${cliSelect}`}
            width={"100%"}
            // height={"600"}
            height={"550"}
            style={{ border: "none" }}
            title="drawer"
          ></iframe>
        </Drawer>
      )}
    </>
  );
};

export default TablaCli;
