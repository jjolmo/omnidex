import fs from 'fs-extra';
import logger from 'jet-logger';
import childProcess from 'child_process';


/**
 * Start
 */

(async () => {
  try {
    // Rutas
    const distPath = './dist/';

    // Paso 2: Limpiar dist
    await remove(distPath);
    console.log('Carpeta dist eliminada.');

    // Paso 3: Build + copias base
    await exec('tsc --build tsconfig.prod.json', './');
    await copy('./src/public', `${distPath}public`);

    // Paso 4: Reorganizar estructura de directorios si es necesario
    const serverSrcPath = `${distPath}server/src`;
    if (await fs.pathExists(serverSrcPath)) {
      console.log('Reorganizando estructura de directorios...');
      // Mover todo el contenido de server/src a dist
      await fs.move(serverSrcPath, `${distPath}temp_src`);
      await fs.remove(`${distPath}server`);
      await fs.move(`${distPath}temp_src`, `${distPath}src`);
      console.log('Estructura de directorios reorganizada.');
    }

  } catch (err) {
    // Manejar errores
    logger.err(err);
    process.exit(1); // eslint-disable-line n/no-process-exit
  }
})();

/**
 * Remove file
 */
function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.remove(loc, err => {
      return (!!err ? rej(err) : res());
    });
  });
}

/**
 * Copy file.
 */
function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fs.copy(src, dest, err => {
      return (!!err ? rej(err) : res());
    });
  });
}

/**
 * Do command line command.
 */
function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, {cwd: loc}, (err, stdout, stderr) => {
      if (!!stdout) {
        logger.info(stdout);
      }
      if (!!stderr) {
        logger.warn(stderr);
      }
      return (!!err ? rej(err) : res());
    });
  });
}
