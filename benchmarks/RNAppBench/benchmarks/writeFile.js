import fs from "react-native-fs";

export async function write(content, encoding = "utf8") {
    var path = fs.DocumentDirectoryPath + '/output.txt';
    try {
        await fs.writeFile(path, content, encoding);
        console.log("written to file");
    } catch (error) {
        console.log(error);
    }
}