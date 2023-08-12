import { Developer, DevelopersData, Infos, developerCreate, infoCreate } from "../interfaces";
import { QueryResult } from "pg";
import { client } from "../database/database";
import format from "pg-format";

export const registerNewDeveloper = async (body: developerCreate): Promise<Developer> => {
    const queryString: string = format(`
        INSERT INTO "developers" (%I)
        VALUES (%L)
        RETURNING *;
        `,
        Object.keys(body),
        Object.values(body)
    )

    const queryResult: QueryResult<Developer> = await client.query(queryString)
    
    return queryResult.rows[0]
}

export const getDeveloperInfo = async (id: number): Promise<DevelopersData> => {
    const queryString: string = `
        SELECT 
            "d"."id" AS "developerId",
            "d"."name" AS "developerName",
            "d"."email" AS "developerEmail",
            "di"."developerSince" AS "developerInfoDeveloperSince",
            "di"."preferedOS" AS "developerInfoPreferredOS"
        FROM "developers" AS "d"
        LEFT JOIN "developerInfos" AS "di"
            ON "di"."developerId" = "d"."id"
        WHERE "d"."id" = $1;
    `

    const queryResult: QueryResult = await client.query(queryString, [ id ])

    return queryResult.rows[0]
}

export const updateDeveloper = async (body: Partial<developerCreate>, id: number): Promise<Developer> => {
    const queryString: string = format(`
            UPDATE "developers"
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

export const dropDeveloper = async (id: number): Promise<void> => {
    await client.query(`DELETE FROM "developers" WHERE "id" = $1;`, [ id ])
}

export const insertDeveloperInfo = async (body: infoCreate, id: number): Promise<Infos> => {
    const queryString: string = `
        INSERT INTO "developerInfos" ("developerSince", "preferedOS", "developerId")
        VALUES ($1, $2, $3)
        RETURNING *;
    `
    const date = new Date(Object.values(body)[0])

    const queryResult: QueryResult<Infos> = await client.query(queryString, [date, Object.values(body)[1], id])

    return queryResult.rows[0]
}