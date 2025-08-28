import { neon } from "@neondatabase/serverless";
import { postgresqlUri } from "../utils/constraints.js";

const sql = neon(postgresqlUri);

export default sql;
