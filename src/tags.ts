import { convertResultToArray } from "./convertResultToArray";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import fetch from "node-fetch";
import * as ejs from 'ejs';
import * as fs from 'fs';

const resultsPerPage = 100;

export const main: APIGatewayProxyHandlerV2 = async (event) => {
  if (event.pathParameters !== undefined && event.pathParameters.apiKey !== undefined 
    && event.pathParameters.siteId !== undefined) {
      if (event.queryStringParameters !== undefined && event.queryStringParameters.page !== undefined){
        console.log("Page number")
        console.log(event.queryStringParameters.pageNumber)
        return tags(event.pathParameters.apiKey, event.pathParameters.siteId, Number(event.queryStringParameters.page)) 
      } else {
        return tags(event.pathParameters.apiKey, event.pathParameters.siteId, 1) 
      }
  } else {
    return {
      "statusCode": 404,
      "body": "Missing Path Parameter",
      "headers": {"Content-Type": "text/html"}
    }
  }
};

async function tags(apiKey: string, siteId: string, pageNumber: number) {
  try {
    const resultsPerPageString = resultsPerPage.toString()
      const apiResponse = await fetch(
          "https://journeyfurther.getstat.com/api/v2/" + apiKey + "/tags/list?format=json&results="+ resultsPerPageString + "&site_id=" + siteId + "&start=" + startSearchAt(pageNumber)
      )
      const apiResponseJson = await apiResponse.json()
      const htmlContent = fs.readFileSync(__dirname + '/views/tags.ejs', 'utf8');
      console.log("Response")
      console.log(apiResponseJson)
      console.log("Number of pages")
      const pages = numberOfPages(apiResponseJson.Response.totalresults)
      console.log(pages)
      const htmlRenderized = ejs.render(htmlContent, {
        filename: 'views/tags.ejs', 
        data: {
          apiKey,
          results: convertResultToArray(apiResponseJson.Response.Result),
          numberOfPages: pages,
          pageNumber: pageNumber,
          siteId: siteId
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

function numberOfPages(totalResultsString: string): Number {
  const totalResults = Number(totalResultsString)
  return Math.ceil(totalResults / resultsPerPage)
}

function startSearchAt(pageNumber: number): string {
  const searchAtNumber = (pageNumber - 1) * resultsPerPage
  return searchAtNumber.toString()
}