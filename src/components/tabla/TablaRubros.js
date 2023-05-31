/* eslint-disable react-hooks/exhaustive-deps */
import { Spin, Table } from "antd";
import React, { useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalContext";

const TablaRubros = () => {
  const URLDOS = process.env.REACT_APP_URL;

  const {
    idUsu,
    infoClientes,
    setInfoclientes,
    searchValue,
    setSelectedCliente,
    setIsDrawerVisible,
    cliSelect,
    setCliSelect,
    isLoadingTR,
    setIsLoadingTR,
    setIsLoadingTP,
    setIsLoadingTI,
    activeTab,
  } = useContext(GlobalContext);

  const cargarTablaInfo = () => {
    setIsLoadingTR(true); // Establecer isLoadingTR en true antes de hacer la solicitud
      const data = new FormData();
      data.append("idU", idUsu);
      fetch(`${URLDOS}tablaRubro.php`, {
        method: "POST",
        body: data,
      }).then(function (response) {
        response.text().then((resp) => {
          const data = resp;
          const objetoData = JSON.parse(data);
          setInfoclientes(objetoData);
          setIsLoadingTR(false); // Establecer isLoadingTR en false después de recibir la respuesta
          setIsLoadingTI(true); // Establecer isLoadingTI en false el spin de tabla informacion
          setIsLoadingTP(true); // Establecer isLoadingTP en false el spin de tabla productivo
        });
      });
  };

    //* PARA ORDENAR LOS VALORES EN LA TABLA, TENIENDO EN CUENTA LOS CARACTERES ESPECIALES Y LETRAS
    const convertToNumber = (value) => {
      const cleanedString = value.replace(/[^0-9.,S/D]+/g, "").replace(/\./g, "").replace(/,/g, ".");
      return cleanedString === "S/D" ? Number.MIN_SAFE_INTEGER : parseFloat(cleanedString);
    };

  useEffect(() => {
    if (activeTab === "3" && idUsu) {
      cargarTablaInfo();
    }
  }, [activeTab, idUsu]);


  const columnsRubros = [
    {
      title: "CUENTA",
      dataIndex: "cuenta",
      key: "cuenta",
      align: "center",
      width: "50px",
    },
    {
      title: "CLIENTE",
      dataIndex: "clientes",
      key: "clientes",
      align: "left",
      render: (text, record) => (
        <div
          style={{
            color: "#00b33c",
            maxWidth: "250px", // Ajusta el valor según el ancho deseado
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      ),
      width: "300px",
    },
    {
      title: "HAS. TOTALES",
      dataIndex: "hasTotales",
      key: "hasTotales",
      align: "right",
      sorter: (a, b) => convertToNumber(a.hasTotales) - convertToNumber(b.hasTotales),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "AGRICULTURA",
      dataIndex: "agricultura",
      key: "agricultura",
      align: "right",
      sorter: (a, b) => convertToNumber(a.agricultura) - convertToNumber(b.agricultura),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "GANADERIA",
      dataIndex: "ganaderia",
      key: "ganaderia",
      align: "right",
      sorter: (a, b) => convertToNumber(a.ganaderia) - convertToNumber(b.ganaderia),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "TAMBO",
      dataIndex: "tambo",
      key: "tambo",
      align: "right",
      sorter: (a, b) => convertToNumber(a.tambo) - convertToNumber(b.tambo),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "MIXTO",
      dataIndex: "mixto",
      key: "mixto",
      align: "right",
      sorter: (a, b) => convertToNumber(a.mixto) - convertToNumber(b.mixto),
      sortDirections: ["ascend", "descend"],
    },
  ];

  const handleCliente = (record) => {
    setSelectedCliente(record);
    setIsDrawerVisible(true);
    setCliSelect(parseInt(record.key));
  };

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

  const numberFormatOptions = {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

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
        : "S/D",
      agricultura: c.Agricultura
        ? typeof c.Agricultura === "string"
          ? parseInt(c.Agricultura)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Agricultura
        : "S/D",
      ganaderia: c.Ganaderia
        ? typeof c.Ganaderia === "string"
          ? parseInt(c.Ganaderia)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Ganaderia
        : "S/D",
      tambo: c.Tambo
        ? typeof c.Tambo === "string"
          ? parseInt(c.Tambo)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Tambo
        : "S/D",
      mixto: c.Mixto
        ? typeof c.Mixto === "string"
          ? parseInt(c.Mixto)
              .toLocaleString(undefined, numberFormatOptions)
              .replace(/,/g, ".")
          : c.Mixto
        : "S/D",
    }))
  );

  return (
    <>
      {isLoadingTR ? (
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
        <Table
          dataSource={dataRubros}
          columns={columnsRubros}
          size="middle"
          onRow={(record) => ({
            onClick: () => handleCliente(record),
          })}
        />
      )}
    </>
  );
};

export default TablaRubros;
