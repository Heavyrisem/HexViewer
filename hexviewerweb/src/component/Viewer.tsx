import React, {useState, useEffect} from 'react';
import '../style/Viewer.css';

interface PViewer {
    BinaryData: Buffer,
    BytesWidth: number,
    BitsSize: number
}

function SelectionHandler(event: React.SyntheticEvent<HTMLDivElement, Event>) {
	const Selection = window.getSelection();
	console.log(Selection?.anchorNode, Selection?.anchorOffset, Selection?.focusNode, Selection?.focusOffset);
	console.log(Selection?.getRangeAt(0).commonAncestorContainer);
	// console.log('selected');
}

function Tab() {
	return (
		<span className="Tab"></span>
	)
}

function Viewer(props: PViewer) {
	const [SlicedData, setSlicedData] = useState<Array<Array<Buffer>>>([]);
    
	useEffect(() => {
		let temp = [];
		for (let i = 1; i <= props.BinaryData.length; i=i+props.BytesWidth) {
			let SplitData = props.BinaryData.slice(i-1, i+props.BytesWidth-1);
			let jumpedData: Array<Buffer> = [];

			for (let j = 1; j <= SplitData.length; j=j+(props.BitsSize/4/2)) {
				jumpedData.push(Buffer.from(SplitData.slice(j-1, j+props.BitsSize/4/2-1)));
			}


			// console.log(BinaryData.slice(i-1, i+props.BytesWidth-1).toString('hex'));
			temp.push(jumpedData);
		}
		console.log(temp)
		setSlicedData(temp);
	}, [props.BytesWidth, props.BitsSize])

	return (
		<div className="Viewer">
			<div className="table">
				<div className="row offset">
					{
						SlicedData.map((Row, idx) => (
							<div key={idx}>{idx*8}</div>
						))
					}
				</div>
				<div className="mainviewport" suppressContentEditableWarning={true} contentEditable onSelect={SelectionHandler}>
					{/* <pre>
					{
						SlicedData.map((Hex, idx) => (
							<>
							{
							Hex.map((Hex, idx) => (
								<>{Hex.toString('hex')}&#09;</>
							))
							}
							<p></p>
							</>
						))
					}
					</pre> */}
					{
						SlicedData.map((Hex, idx) => (
							<div className="row" key={idx} suppressContentEditableWarning={true} contentEditable>
							{
								Hex.map((Hex, idx) => (
									<span key={idx}>{Hex.toString('hex')}</span>
								))
								// Hex.split(" ").map((Hex, idx) => (<span key={idx}>{Hex}</span>))
							}</div>
						))
					}
				</div>
			</div>
		</div>
	);
}

export default Viewer;