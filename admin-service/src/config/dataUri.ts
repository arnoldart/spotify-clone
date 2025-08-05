import DataURIASync from "datauri";
import DataURIParser from "datauri/parser.js";
import path from "path"

const getBuffer = (file:any) => {
    const parser = new DataURIParser()

    const extName = path.extname(file.orginalname).toString()

    return parser.format(extName, file.buffer)
}

export default getBuffer