import CodeView, { download } from "components/CodeView";
import ThemeSwitcher from "components/ThemeSwitcher";
import { Button, Col, InputField, Row, Toolbar, ToolbarActions, ToolbarTitle } from "photoncss/lib/react";
import React, { useEffect, useState } from "react";

export const route = "/";

export default function View(): JSX.Element {

	const [ code, setCode ] = useState(localStorage.getItem("last_input") || "");
	const [ size, setSize ] = useState(localStorage.getItem("last_fontsize") || "14px");
	const [ language, setLanguage ] = useState(localStorage.getItem("last_language") || "Javascript");

	useEffect(function() {
		$("#input").on("keypress change keyup keydown", function() {
			localStorage.setItem("last_input", $("#input").val()!.toString());
			setCode($("#input").val()!.toString());
		});

		(function loop() {
			requestAnimationFrame(loop);

			localStorage.setItem("last_language", $("#language").val()!.toString());
			setLanguage($("#language").val()!.toString());

			localStorage.setItem("last_fontsize", $("#fontsize").val()!.toString());
			setSize($("#fontsize").val()!.toString());

		}());
	}, []);

	return (
		<>
			<Toolbar>
				<ToolbarTitle>{APP_MANIFEST.name}</ToolbarTitle>
				<ToolbarActions>
					<ThemeSwitcher/>
				</ToolbarActions>
			</Toolbar>
			<Row style={{ margin: "0 -8px", marginBottom: -8 }}>
				<Col lg={6}>
					<InputField dropdown={[ "JavaScript" ]} defaultValue={language} id="language">Select Language</InputField>
					<InputField dropdown={[ "12px", "14px", "16px" ]} defaultValue={size} id="fontsize">Select Font Size</InputField>
					<textarea id="input" placeholder="Paste your snippet here..." className="code">{code}</textarea>
				</Col>
				<Col lg={6}>
					<div id="code-preview">
						<CodeView code={code} language={language} size={size}/>
						<div style={{ textAlign: "center" }}>
							<Button size="large" color="primary" variant="raised" onClick={download}>Download image</Button>
						</div>
					</div>
				</Col>
			</Row>
		</>
	);
}
