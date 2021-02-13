import { convertResultToArray } from "./convertResultToArray";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import fetch from "node-fetch";
import * as ejs from 'ejs';
import * as fs from 'fs';

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.pathParameters !== undefined && event.pathParameters.apiKey !== undefined 
    && event.pathParameters.siteId !== undefined) {
    return tags(event.pathParameters.apiKey, event.pathParameters.siteId) 
  } else {
    return {
      "statusCode": 404,
      "body": "Missing Path Parameter",
      "headers": {"Content-Type": "text/html"}
    }
  }
};

async function tags(apiKey: string, siteId: string) {
  try {
      const apiResponse = await fetch(
          "https://journeyfurther.getstat.com/api/v2/" + apiKey + "/tags/list?format=json&site_id=" + siteId
      )
      const apiResponseJson = await apiResponse.json()
      const htmlContent = fs.readFileSync(__dirname + '/views/tags.ejs', 'utf8');
      const htmlRenderized = ejs.render(htmlContent, {
        filename: 'views/tags.ejs', 
        data: {
          apiKey,
          results: convertResultToArray(apiResponseJson.Response.Result)
        }
      });
      return {
          "statusCode": 200,
          "body": htmlRenderized,
          "headers": {"Content-Type": "text/html"}
      }
    } catch (err) {
      console.log(err)
      return {
        "statusCode": 500,
        "body": "Something went wrong",
        "headers": {"Content-Type": "text/html"}
    }
  }
}