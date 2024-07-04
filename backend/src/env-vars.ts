import * as fs from 'fs';

export const BEETS_LIBRARY_DB = process.env.BEETS_LIBRARY_DB;
export const BEETS_LIBRARY_ROOT = process.env.BEETS_LIBRARY_ROOT;

export const SYNCTHING_STIGNORE_FILE_NAME = process.env.SYNCTHING_STIGNORE_FILE_NAME ?? '.stignore';

export function checkEnvVars() {
  if (!BEETS_LIBRARY_DB) {
    throw `Environment variable BEETS_LIBRARY_DB is not defined.`;
  } else if (!fs.existsSync(BEETS_LIBRARY_DB)) {
    throw `Beet's library database file "${BEETS_LIBRARY_DB}" doesn't exists (env var: BEETS_LIBRARY_DB).`
  }

  if (!BEETS_LIBRARY_ROOT) {
    throw `Environment variable BEETS_LIBRARY_ROOT is not defined.`;
  } else if (!fs.existsSync(BEETS_LIBRARY_ROOT)) {
    throw `Beet's library root "${BEETS_LIBRARY_ROOT}" doesn't exists (env var: BEETS_LIBRARY_ROOT).`
  }
}