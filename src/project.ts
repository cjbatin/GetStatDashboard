import { convertResultToArray } from "./convertResultToArray";
import { trackedSites } from "./trackedSites";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import fetch from "node-fetch";
import * as ejs from 'ejs';
import * as fs from 'fs';

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.pathParameters !== undefined && event.pathParameters.apiKey !== undefined && event.pathParameters.projectId) {
    return sites(event.pathParameters.apiKey, event.pathParameters.projectId) 
  } else {
    return {
      "statusCode": 404,
      "body": "Missing APIKey",
      "headers": {"Content-Type": "text/html"}
    }
  }
};

async function sites(apiKey: string, projectId: string) {
  try {
    const apiResponse = await fetch(
      "https://journeyfurther.getstat.com/api/v2/" + apiKey + "/sites/list?format=json&project_id=" + projectId
    )
      const apiResponseJson = await apiResponse.json()
      const htmlContent = fs.readFileSync(__dirname + '/views/sites.ejs', 'utf8');
      const allSites = convertResultToArray(apiResponseJson.Response.Result)
      const htmlRenderized = ejs.render(htmlContent, {
        filename: 'views/sites.ejs', 
        data: {
          apiKey,
          allSites,
          trackedSites: trackedSites(allSites)
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