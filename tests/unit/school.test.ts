import { assertEquals } from "https://deno.land/std@0.112.0/testing/asserts.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import * as Server from "../../src/Server.ts";
import * as School from "../../src/School.ts";
import { ErrorResponse, SuccessResponse } from "../../src/Server.ts";

const conf = config();
const schoolCode = conf.SCHOOL_CODE;
const schoolName = conf.SCHOOL_NAME;

async function getSchoolName() {
    const serv = await new Server.Server(schoolCode)
        .request()
        .then((res: SuccessResponse) => {
            return res;
        })
        .catch((err: ErrorResponse) => {
            throw err.message;
        });

    if (serv.success) {
        const sch = await new School.School(serv)
            .request()
            .then((res: School.SuccessResponse) => {
                return res;
            })
            .catch((err: School.ErrorResponse) => {
                throw err.message;
            });

        if (sch.success) {
            return sch.schoolName;
        }
    }
}

const name = await getSchoolName()
console.log(name);