import { Card } from "photoncss/lib/react";
import React from "react";
import Markdown from "./Markdown";
import html2canvas from "html2canvas";

export function download(): void {

	html2canvas(document.getElementById("code")!).then((canvas)=>{
		const t = canvas.toDataURL().replace("data:image/png;base64,", "");
		downloadBase64File("image/png", t, "image");
	});

	function downloadBase64File(contentType: string, base64Data: string, fileName: string) {
		const linkSource = `data:${contentType};base64,${base64Data}`;
		const downloadLink = document.createElement("a");
		downloadLink.href = linkSource;
		downloadLink.download = fileName;
		downloadLink.click();
		downloadLink.remove();
	}

}

export type Props = { language: string, code: string, size: string };
export default function Component({ language, code, size }: Props): JSX.Element {

	setImmediate(function() {
		$("code").css("font-size", size);
	});

	return (
		<Card id="code">
			<Markdown>{`\`\`\`${language}\n${code}\n\`\`\``}</Markdown>
		</Card>
	);
}
