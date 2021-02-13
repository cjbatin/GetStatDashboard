import { Request, Response } from "express";
import fetch from "node-fetch";
import { convertResultToArray } from "./convertResultToArray";

export async function project(req: Request, res: Response) {
    try {
        const apiKey = req.params.apiKey;
        const projectId = req.params.id
        const apiResponse = await fetch(
            "https://journeyfurther.getstat.com/api/v2/" + apiKey + "/sites/list?format=json&project_id=" + projectId
        )
        const apiResponseJson = await apiResponse.json()
        return res.render('sites',
          {
            apiKey,
            results: convertResultToArray(apiResponseJson.Response.Result)
            }
        );
      } catch (err) {
        console.log(err)
        return res.status(500).send('Something went wrong')
    }
}