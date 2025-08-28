import { neon } from "@neondatabase/serverless";
import { postgresUri } from "../utils/constraints.js";

const sql = neon(postgresUri);

export default sql;
