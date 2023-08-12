import format from "pg-format";
import { ProjectData, Projects, projectsCreate } from "../interfaces";
import { QueryResult } from "pg";
import { client } from "../database/database";

export const createNewProject = async (body: projectsCreate): Promise<Projects> => {
    if(body.endDate) body.endDate = new Date(body.endDate)
    
    const queryString: string = format(`
            INSERT INTO "projects" (%I)
            VALUES (%L)
            RETURNING *;
        `,
        Object.keys(body),
        Object.values(body)
    )

    const queryResult: QueryResult = await client.query(queryString)

    return queryResult.rows[0]
}

export const getProjectById = async (id: number): Promise<ProjectData> => {
    const queryString: string = `
        SELECT
            "p"."id" AS "projectId",
            "p"."name" AS "projectName",
            "p"."description" AS "projectDescription",
            "p"."repository" AS "projectRepository",
            "p"."startDate" AS "projectStartDate",
            "p"."endDate" AS "projectEndDate",
            "d"."name" AS "projectDeveloperName"
        FROM "projects" AS "p"
        LEFT JOIN "developers" AS "d"
            ON "d"."id" = "p"."developerId"
        WHERE "p"."id" = $1;
    `

    const queryResult: QueryResult = await client.query(queryString, [ id ])

    return queryResult.rows[0]
}

export const updateProject = async (body: Partial<projectsCreate>, id: number): Promise<Projects> => {
    if(body.startDate) body.startDate = new Date(body.startDate)

    if(body.endDate) body.endDate = new Date(body.endDate)

    const queryString: string = format(`
            UPDATE "projects"
            SET (%I) = ROW(%L)
            WHERE "id" = $1
            RETURNING *;
        `,
        Object.keys(body),
        Object.values(body)
    )

    const queryResult: QueryResult = await client.query(queryString, [ id ])

    return queryResult.rows[0]
}