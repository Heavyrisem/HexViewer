import React, { useEffect, useState } from 'react';
import '../style/Main.css';
import { SliceBinary } from './BinaryParser';
import Viewer from './Viewer';


function Main() {
	const [BinaryData, setBinaryData] = useState<Buffer>(Buffer.from('736268601467606060016266206204D28C0C470C7D56333038B33C60626248494E2D66800226204CC9C94F46F0FD18FC1914183C18C219021878195C581A60520CAE2C0E4C30F60B66080E02E208A8A8C43210C9C6E0CEF2810966471EC8190C0EF22037E0019E1C0D4C1D2F1818EE78303258283280B18A1803C31C010486012F8E0370B33481C6FE078220667326694646466CF23FF41F3080E4814E008B7B733C003BA6931502198912716761600405140B924B9C80410DF41F38849819205E8459ED0C0CB80F470E9C3CB1137B203AB0E10F4400E262996AC7010000', "hex"));
	const [SlicedData, setSlicedData] = useState<Array<Array<Buffer>>>([]);
	const [BytesWidth, setBytesWidth] = useState<number>(8);
	const [BitsSize, setBitsSize] = useState<number>(8);
	
	useEffect(() => {
		setSlicedData(SliceBinary(BinaryData, BytesWidth, BitsSize));
	}, [BytesWidth, BitsSize])

	return (
		<div>
			<select onChange={(e)=>{setBytesWidth(parseInt(e.target.value))}}>
				<option value="4">4</option>
				<option value="8">8</option>
				<option value="16">16</option>
				<option value="32">32</option>
			</select>

			<select onChange={(e)=>{setBitsSize(parseInt(e.target.value))}}>
				<option value="8">8</option>
				<option value="16">16</option>
				<option value="32">32</option>
			</select>

			<Viewer BinaryData={BinaryData} BitsSize={BitsSize} BytesWidth={BytesWidth} />
		</div>
	);
}

export default Main;
