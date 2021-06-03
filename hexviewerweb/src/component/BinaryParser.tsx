


export function SliceBinary(BinaryData: Buffer, BytesWidth: number, BitsSize: number) {

    let temp = [];
    for (let i = 1; i <= BinaryData.length; i=i+BytesWidth) {
        let SplitData = BinaryData.slice(i-1, i+BytesWidth-1);
        let jumpedData: Array<Buffer> = [];

        for (let j = 1; j <= SplitData.length; j=j+(BitsSize/4/2)) {
            jumpedData.push(Buffer.from(SplitData.slice(j-1, j+BitsSize/4/2-1)));
        }


        // console.log(BinaryData.slice(i-1, i+BytesWidth-1).toString('hex'));
        temp.push(jumpedData);
    }
    return temp;

}