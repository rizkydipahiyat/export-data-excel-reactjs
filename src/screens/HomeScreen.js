import React, { useEffect, useState } from "react";
import { Card, Form, Table } from "react-bootstrap";
import { getCountries, getData } from "../data/api";
import { ScaleLoader } from "react-spinners";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import ReactExport from "react-data-export";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const HomeScreen = () => {
	const [countries, setCountries] = useState([]);
	const [exportData, setExportData] = useState([]);
	const [loading, setLoading] = useState(false);

	const override = `
   display: flex;
   align-items: center;
   justify-content: center;
   border-color: "#000";
   `;

	// const DataSet = [
	// 	{
	// 		columns: [
	// 			{
	// 				title: "Province State",
	// 				style: { font: { sz: "14", bold: true } },
	// 				width: { wpx: 125 },
	// 			}, // wpx is width in pixles
	// 			{
	// 				title: "Country Region",
	// 				style: { font: { sz: "14", bold: true } },
	// 				width: { wch: 30 },
	// 			}, // wch is width in characters
	// 			{
	// 				title: "Confirmed",
	// 				style: { font: { color: "ffffff" } },
	// 				fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
	// 				width: { wpx: 100 },
	// 			}, // wpx is width in pixles
	// 			{
	// 				title: "Deaths",
	// 				style: { font: { color: "ffffff" } },
	// 				fill: { patternType: "solid", fgColor: { rgb: "4bd909" } },
	// 				width: { wpx: 125 },
	// 			}, // wpx is width in pixles
	// 			{
	// 				title: "Recivered",
	// 				style: { font: { color: "ffffff" } },
	// 				fill: { patternType: "solid", fgColor: { rgb: "ebc907" } },
	// 				width: { wpx: 100 },
	// 			}, // wpx is width in pixles
	// 			{
	// 				title: "Active",
	// 				style: { font: { color: "ffffff" } },
	// 				fill: { patternType: "solid", fgColor: { rgb: "35bdb4" } },
	// 				width: { wpx: 125 },
	// 			}, // wpx is width in pixles
	// 			{
	// 				title: "Incident Rate",
	// 				style: { font: { color: "ffffff" } },
	// 				fill: { patternType: "solid", fgColor: { rgb: "ed14f5" } },
	// 				width: { wch: 30 },
	// 			}, // wch is width in characters
	// 			{
	// 				title: "Latitude",
	// 				style: { font: { color: "ffffff" } },
	// 				fill: { patternType: "solid", fgColor: { rgb: "ed14f5" } },
	// 				width: { wpx: 125 },
	// 			}, // wpx is width in pixles
	// 			{
	// 				title: "Longitude",
	// 				style: { font: { color: "ffffff" } },
	// 				fill: { patternType: "solid", fgColor: { rgb: "000000" } },
	// 				width: { wpx: 125 },
	// 			}, // wpx is width in pixles
	// 			{
	// 				title: "Last Update",
	// 				style: { font: { color: "ffffff" } },
	// 				fill: { patternType: "solid", fgColor: { rgb: "3461eb" } },
	// 				width: { wpx: 110 },
	// 			}, // wpx is width in pixles
	// 		],
	// 		data: exportData.map((data) => [
	// 			{ value: data.provinceState, style: { font: { sz: "12" } } },
	// 			{ value: data.countryRegion, style: { font: { sz: "12" } } },
	// 			{ value: data.confirmed, style: { font: { sz: "12" } } },
	// 			{ value: data.deaths, style: { font: { sz: "12" } } },
	// 			{ value: data.deaths, style: { font: { sz: "12" } } },
	// 			{ value: data.recovered, style: { font: { sz: "12" } } },
	// 			{ value: data.active, style: { font: { sz: "12" } } },
	// 			{ value: data.incidentRate, style: { font: { sz: "12" } } },
	// 			{ value: data.lat, style: { font: { sz: "12" } } },
	// 			{ value: data.long, style: { font: { sz: "12" } } },
	// 			{ value: data.lastUpdate, style: { font: { sz: "12" } } },
	// 		]),
	// 	},
	// ];

	const getAllCountries = async () => {
		const data = await getCountries();
		setCountries(data);
	};

	const handleChangeCountry = async (e) => {
		setExportData([]);
		setLoading(true);
		const data = await getData(e.target.value);
		console.log(data);
		setExportData(data);
		setLoading(false);
	};

	useEffect(() => {
		getAllCountries();
	});

	return (
		<div className="container">
			<Card>
				<Card.Body>
					<Card.Title>Excel Export</Card.Title>
					<Form>
						<Form.Label>Select Country</Form.Label>
						<Form.Control
							as="select"
							defaultValue="--Country--"
							onChange={(e) => handleChangeCountry(e)}
						>
							{countries.map((country, index) => (
								<option key={index} value={country.name}>
									{country.name}
								</option>
							))}
						</Form.Control>
					</Form>
					{exportData.length !== 0 ? (
						<ReactHTMLTableToExcel
							className="btn btn-success m-3"
							table="emp-table"
							filename={`Covid-19 Data ${exportData[0].countryRegion}`}
							sheet="Sheet"
							buttonText="Export to Excel"
						/>
					) : null}
					{/* {exportData.length !== 0 ? (
						<ExcelFile
							filename="Covid-19 Data"
							element={
								<button
									type="button"
									className="btn btn-success float-right m-3"
								>
									Export Data
								</button>
							}
						>
							<ExcelSheet dataSet={DataSet} name="Covid-19 Data Report" />
						</ExcelFile>
					) : null} */}
					<Table responsive id="emp-table">
						<thead>
							<tr>
								<th>Province</th>
								<th>Country Region</th>
								<th>Confirmed</th>
								<th>Deaths</th>
								<th>Recovered</th>
								<th>Active</th>
								<th>Incident Rate</th>
								<th>Latitude</th>
								<th>Longitude</th>
								<th>Last Update</th>
							</tr>
						</thead>
						<tbody>
							{exportData.length === 0 ? (
								<tr>
									<td colSpan="10">
										<ScaleLoader
											css={override}
											size={150}
											color={"#eb4034"}
											loading={loading}
										/>
									</td>
								</tr>
							) : (
								<>
									{exportData.map((data) => (
										<tr key={data.uid}>
											<td>{data.provinceState}</td>
											<td>{data.countryRegion}</td>
											<td>{data.confirmed}</td>
											<td>{data.deaths}</td>
											<td>{data.recovered}</td>
											<td>{data.active}</td>
											<td>{data.incidentRate}</td>
											<td>{data.lat}</td>
											<td>{data.long}</td>
											<td>{data.lastUpdate}</td>
										</tr>
									))}
								</>
							)}
						</tbody>
					</Table>
				</Card.Body>
			</Card>
		</div>
	);
};

export default HomeScreen;
