import './App.css'
import { Button, Input, Tabs, TabList, Tab, Divider, Select } from "@chakra-ui/react"
import logo from "./assets/wexel.png";
import { useEffect, useRef, useState } from 'react';
import { toast } from "react-toastify";
import rgbToHex from "./helpers/RgbToHex";
import AlphabetHeaders from './helpers/TableHeaders';

function App() {

	const [selected, setSelected] = useState(null);
	const columnRefs = useRef([]);

	useEffect(() => {
		if (selected) {
			document.getElementById("foreColor").value = rgbToHex(selected.style.color);
			document.getElementById("backColor").value = rgbToHex(selected.style.backgroundColor);
			document.getElementById("fontSelect").value = selected.style.fontFamily.replaceAll('"', '');
		}
	}, [selected])

	function tdKeyDown(e) {
		if (e.key == "Enter" && selected && selected.value.startsWith("[") && selected.value.endsWith("]")) {
			selected.value = eval(selected.value.replace("[", '').replace("]", ''));
			toast("Przeliczanie wyrażenia...")
		}

		if (e.key == "ArrowLeft") {
			for (let i in columnRefs.current[selected.getAttribute("col")]) {
				const el = columnRefs.current[selected.getAttribute("col")][i];
				el.style.width = (el.style.width ? Number.parseInt(el.style.width.replace("px", '')) - 5 + 'px' : "120px");
			}
		}
		if (e.key == "ArrowRight") {
			for (let i in columnRefs.current[selected.getAttribute("col")]) {
				const el = columnRefs.current[selected.getAttribute("col")][i];
				el.style.width = (el.style.width ? Number.parseInt(el.style.width.replace("px", '')) + 5 + 'px' : "120px");
			}
		}
	}

	return (
		<>
			<main>
				<div className="nav">
					<img src={logo} width={40} />
					<span className="logo">WEXEL</span>
					<Input style={{ background: "white" }} placeholder='Kliknij tutaj aby wyszukać...' />
				</div>
				<div className="toolbar">
					<div className="column">
						<Tabs>
							<TabList>
								<Tab>Narzędzia główne</Tab>
								<Tab>Wstawianie</Tab>
								<Tab>Układ strony</Tab>
								<Tab>Formuły</Tab>
								<Tab>Dane</Tab>
								<Tab>Recenzja</Tab>
								<Tab>Widok</Tab>
							</TabList>
						</Tabs>
						<div className="flex" style={{ padding: 10 }}>
							<a download={"arkusz.xls"} href='arkusz.xls'>
								<div className="option" style={{ marginRight: 10 }}>
									<img width="40" src="https://img.icons8.com/fluency/96/save.png" alt="save" />
									<span>Zapisz</span>
								</div>
							</a>
							<div className="option" style={{ marginRight: 10 }} onClick={() => {
								navigator.clipboard.readText().then((txt) => {
									selected.value = txt;
								});
							}}>
								<img src="https://cdn.discordapp.com/attachments/910245595271286795/1205212374894641223/icons8-paste-64.png?ex=65d78c7d&is=65c5177d&hm=0e6da8ecb1dc97c900899651b9b7ef39a0de88b387251aee246c9d7144a37019&" width={40} />
								<span>Wklej</span>
							</div>
							<div className="column">
								<div className="smallOption" onClick={() => {
									navigator.clipboard.writeText(selected.value);
									selected.value = "";
								}}>
									<img src="https://cdn.discordapp.com/attachments/910245595271286795/1205213998388084766/icons8-cut-48.png?ex=65d78e01&is=65c51901&hm=22faf8c7b4f0aa2958ca2bf130e8ee7729fa96f2da63debffa993376dc915dfc&" width={18} />
									Wytnij
								</div>
								<div className="smallOption" onClick={() => {
									navigator.clipboard.writeText(selected.value);
								}}>
									<img width="18" src="https://img.icons8.com/cute-clipart/64/copy.png" alt="copy" />
									Kopiuj
								</div>
								<div className="smallOption">
									<img width="18" src="https://img.icons8.com/arcade/64/paint.png" alt="paint" />
									Malarz formatów
								</div>
							</div>
							<Divider orientation='vertical' style={{ height: "100%", marginLeft: 20, marginRight: 10 }} borderColor="#dbdbdb" />
							<div className="column">
								<div className="flex">
									<Select style={{ minWidth: 200 }} onChange={(e) => { selected.style.fontFamily = e.target.value }} id='fontSelect'>
										<option>Times New Poland</option>
										<option>Times New Roman</option>
									</Select>
									<Select id='fontSize' onChange={(e) => { selected.style.fontSize = e.target.value + "px" }}>
										<option>6</option>
										<option>8</option>
										<option>10</option>
										<option>12</option>
										<option>14</option>
										<option>16</option>
										<option>18</option>
										<option>20</option>
										<option>22</option>
										<option>24</option>
										<option>26</option>
										<option>28</option>
										<option>30</option>
										<option>32</option>
										<option>34</option>
									</Select>
								</div>
								<div className="flex font">

									<Button variant={"ghost"} onClick={() => {
										if (selected.style.fontWeight == "bold") {
											selected.style.fontWeight = "normal";
										} else {
											selected.style.fontWeight = "bold"
										}
									}}>B</Button>

									<Button variant={"ghost"} onClick={() => {
										if (selected.style.fontStyle == "italic") {
											selected.style.fontStyle = "normal";
										} else {
											selected.style.fontStyle = "italic"
										}
									}}>I</Button>

									<Button variant={"ghost"} onClick={() => {
										if (selected.style.textDecoration == "underline") {
											selected.style.textDecoration = "none";
										} else {
											selected.style.textDecoration = "underline"
										}
									}}>U</Button>
								</div>
							</div>
							<Divider orientation='vertical' style={{ height: "100%", marginLeft: 20, marginRight: 10 }} borderColor="#dbdbdb" />
							<div className="flex">
								<Button variant={"ghost"} onClick={() => {
									selected.style.textAlign = "left";
								}}>
									<img width="20" src="https://img.icons8.com/material-rounded/24/align-left.png" alt="align-left" />
								</Button>
								<Button variant={"ghost"} onClick={() => {
									selected.style.textAlign = "center";
								}}>
									<img width="20" src="https://img.icons8.com/material-rounded/24/align-center.png" alt="align-center" />
								</Button>
								<Button variant={"ghost"} onClick={() => {
									selected.style.textAlign = "right";
								}}>
									<img width="20" src="https://img.icons8.com/material-rounded/24/align-right.png" alt="align-right" />
								</Button>
							</div>
							<Divider orientation='vertical' style={{ height: "100%", marginLeft: 20, marginRight: 10 }} borderColor="#dbdbdb" />
							<input type='color' id='foreColor' onChange={(e) => {
								selected.style.color = e.target.value;
							}} />
							<input type='color' id='backColor' onChange={(e) => {
								selected.style.backgroundColor = e.target.value;
							}} />
						</div>
					</div>
				</div>
				<div className="actionMenu">

				</div>
				<div className="content">
					<table>
						<thead>
							<tr>
								{AlphabetHeaders().map((header, idx) => (
									<th key={idx} ref={thRef => {
										if (!columnRefs.current[idx]) {
											columnRefs.current[idx] = [];
										}
										columnRefs.current[idx][0] = thRef;
									}}>{header}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{Array.from({ length: 20 }).map((_, rowIdx) => (
								<tr key={rowIdx}>
									{Array.from({ length: AlphabetHeaders().length }).map((_, colIdx) => (
										<td key={colIdx}>
											<input
												ref={inputRef => {
													if (!columnRefs.current[colIdx]) {
														columnRefs.current[colIdx] = [];
													}
													columnRefs.current[colIdx][rowIdx + 1] = inputRef;
												}}
												style={{ fontFamily: "Times New Roman", color: "rgb(0,0,0)", background: "rgb(240,240,240)" }}
												onClick={(e) => setSelected(e.target)}
												onKeyDown={(e) => tdKeyDown(e)}
												{...{ col: colIdx, row: rowIdx }}
											/>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</main >
		</>
	)
}

export default App
