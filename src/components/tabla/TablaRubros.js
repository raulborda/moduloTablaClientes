/* eslint-disable react-hooks/exhaustive-deps */
import { Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import "./style.css";

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

  //const [isTotalRow, setIsTotalRow] = useState(false);

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


    const sorterWithTotalRow = (a, b, dataIndex) => {
      if (a === totalRow || b === totalRow) {
        return 0; // Si uno de los registros es totalRow, se mantiene en su posición original
      }
      const valueA = convertToNumber(a[dataIndex]);
      const valueB = convertToNumber(b[dataIndex]);
      return valueA - valueB;
    };



  useEffect(() => {
    if (activeTab === "3" && idUsu) {
      cargarTablaInfo();
    }
  }, [activeTab, idUsu]);

  // const rowClassName = (record, index) => {
  //   if (isTotalRow && index === 0) {
  //     return "total-row"; // Agrega una clase CSS para la fila totalRow
  //   }
  //   return "";
  // };


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
      sorter: (a, b) => sorterWithTotalRow(a, b, "hasTotales"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "AGRICULTURA",
      dataIndex: "agricultura",
      key: "agricultura",
      align: "right",
      sorter: (a, b) => sorterWithTotalRow(a, b, "agricultura"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "GANADERIA",
      dataIndex: "ganaderia",
      key: "ganaderia",
      align: "right",
      sorter: (a, b) => sorterWithTotalRow(a, b, "ganaderia"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "TAMBO",
      dataIndex: "tambo",
      key: "tambo",
      align: "right",
      sorter: (a, b) => sorterWithTotalRow(a, b, "tambo"),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "MIXTO",
      dataIndex: "mixto",
      key: "mixto",
      align: "right",
      sorter: (a, b) => sorterWithTotalRow(a, b, "mixto"),
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

  const sumColumns = (dataRubros, columnIndex) => {
    let sum = 0;
    for (let i = 0; i < dataRubros.length; i++) {
      const value = parseInt(dataRubros[i][columnIndex].replace(/\./g, "").replace(/,/g, "."), 10);
      if (!isNaN(value)) {
        sum += value;
      }
    }
    return sum.toLocaleString(undefined, {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).replace(/,/g, ".");
  };
  
  

  const totalRow = {
    cuenta: "",
    clientes: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>TOTALES</span>,
    hasTotales: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataRubros, "hasTotales")}</span>,
    agricultura: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataRubros, "agricultura")}</span>,
    ganaderia: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataRubros, "ganaderia")}</span>,
    tambo: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataRubros, "tambo")}</span>,
    mixto: <span style={{ color: '#00b33c', fontWeight: 'bold' }}>{sumColumns(dataRubros, "mixto")}</span>,
  };
  
  // dataRubros.unshift(totalRow);

  // useEffect(() => {
  //   setIsTotalRow(true);
  // }, [dataRubros]);

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
          // rowClassName={rowClassName}
          onRow={(record) => ({
            onClick: () => handleCliente(record),
          })}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row style={{backgroundColor: "#f5fef5"}}>
                <Table.Summary.Cell index={0} />
                <Table.Summary.Cell index={1}>{(totalRow.clientes)}</Table.Summary.Cell>
                <Table.Summary.Cell index={2} className="totalCell">
                 {(totalRow.hasTotales)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3} className="totalCell">
                  {(totalRow.agricultura)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4} className="totalCell">
                  {(totalRow.ganaderia)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5} className="totalCell">
                  {(totalRow.tambo)}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={6} className="totalCell">
                  {(totalRow.mixto)}
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />
      )}
    </>
  );
};

export default TablaRubros;
