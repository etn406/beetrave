import { getDataSourceOutsideNest } from "./utils/get-data-source-outside-nest.js";

// This file export a DataSource object containing PostgreSQL database configuration
// it's used by TypeORM to run migrations outside Nest context
export default await getDataSourceOutsideNest();
