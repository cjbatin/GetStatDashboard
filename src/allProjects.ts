import { convertResultToArray } from "./convertResultToArray";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import fetch from "node-fetch";
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as z from 'zod';

const ExpectedBody = z.object({
  apiKey: z.string()
});
type ExpectedBody = z.infer<typeof ExpectedBody>;

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.pathParameters !== undefined && event.pathParameters.apiKey !== undefined) {
    return allProjects(event.pathParameters.apiKey) 
  } else if (event.body !== undefined) {
    const formJSON = JSON.stringify(event.body)
    console.log("Form JSON")
    console.log(formJSON)
    const body: ExpectedBody = ExpectedBody.parse(formJSON)
    console.log("Body text");
    console.log(body)
    console.log("API Key")
    console.log(body.apiKey)
    return allProjects(body.apiKey)
  } else {
    return {
      "statusCode": 404,
      "body": "Missing APIKey",
      "headers": {"Content-Type": "text/html"}
    }
  }
};

async function allProjects(apiKey: string) {
  try {
      const apiResponse = await fetch(
        "https://journeyfurther.getstat.com/api/v2/" + apiKey + "/projects/list?format=json"
    )
      const apiResponseJson = await apiResponse.json()
      var htmlContent = fs.readFileSync(__dirname + '/views/allProjects.ejs', 'utf8');
      var htmlRenderized = ejs.render(htmlContent, {
        filename: 'views/allProjects.ejs', 
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
