import './App.css'
import { Button, Input, Tabs, TabList, Tab, Divider, Select } from "@chakra-ui/react"
import logo from "./assets/wexel.png";
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

function AlphabetTableHeaders() {
	const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
	const combinations = [];
	for (let i = 0; i < letters.length; i++) {
		for (let j = 0; j < letters.length; j++) {
			const combination = letters[i] + letters[j];
			if (combination <= 'AZ') {
				combinations.push(combination);
			}
		}
	}

	const allHeaders = letters.concat(combinations);

	return allHeaders;
}

function App() {

	const [selected, setSelected] = useState(null);

	useEffect(() => {
		console.log(document.getElementById("fontSelect")?.value)
		document.getElementById("fontSelect").value = selected?.style.fontFamily.replaceAll('"', '');
	}, [selected])

	function tdKeyDown(e) {
		console.log(e.key);
		if (e.key == "Enter" && selected && selected.value.startsWith("[") && selected.value.endsWith("]")) {
			selected.value = eval(selected.value.replace("[", '').replace("]", ''));
			toast("Przeliczanie wyrażenia...")
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
							<div className="option" style={{ marginRight: 10 }}>
								<img src="https://cdn.discordapp.com/attachments/910245595271286795/1205212374894641223/icons8-paste-64.png?ex=65d78c7d&is=65c5177d&hm=0e6da8ecb1dc97c900899651b9b7ef39a0de88b387251aee246c9d7144a37019&" width={40} />
								<span>Wklej</span>
							</div>
							<div className="column">
								<div className="smallOption">
									<img src="https://cdn.discordapp.com/attachments/910245595271286795/1205213998388084766/icons8-cut-48.png?ex=65d78e01&is=65c51901&hm=22faf8c7b4f0aa2958ca2bf130e8ee7729fa96f2da63debffa993376dc915dfc&" width={18} />
									Wytnij
								</div>
								<div className="smallOption">
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
									<Select style={{ minWidth: 200 }} onChange={(e) => {
										selected.style.fontFamily = e.target.value;

									}} id='fontSelect'>
										<option>Times New Poland</option>
										<option>Times New Roman</option>
									</Select>
									<Select>
										<option>6</option>
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
						</div>
					</div>
				</div>
				<div className="actionMenu">

				</div>
				<div className="content">
					<table>
						<tr>
							{AlphabetTableHeaders().map((e) => <th key={e}>{e}</th>)}
						</tr>
						{
							Array.from({ length: 20 }).map(a => (
								<tr key={a}>
									{Array.from({ length: AlphabetTableHeaders().length }).map(b => (
										<td key={b}>
											<input style={{ fontFamily: "Times New Roman" }} onClick={(e) => {
												setSelected(e.target);
											}} onKeyDown={(e) => tdKeyDown(e)} />
										</td>
									))}
								</tr>
							))
						}
					</table>
				</div>
			</main>
		</>
	)
}

export default App
