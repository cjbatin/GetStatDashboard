import { APIGatewayProxyHandlerV2 } from "aws-lambda";
var ejs = require('ejs');
var fs = require('fs');

export const main: APIGatewayProxyHandlerV2 = async (event) => {
    var htmlContent = fs.readFileSync(__dirname + '/views/index.ejs', 'utf8');
    var htmlRenderized = ejs.render(htmlContent, {
        filename: 'views/index.ejs', 
        data: {
            message: 'Hello World!'
        }
    });
    return {
        "statusCode": 200,
        "body": htmlRenderized,
        "headers": {"Content-Type": "text/html"}
    }
};